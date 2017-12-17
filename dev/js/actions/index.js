import fetch from 'isomorphic-fetch';

export const url =  'http://localhost:8000';

export const resource = (method, endpoint, payload, jwt) => {
    // console.log("THE ENDPOINT: " + endpoint + "\n" + "THE PAYLOAD: " + payload + "\n" + "THE METHOD: " + method)
    const options =  {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }
    if (payload) options.body = JSON.stringify(payload)
    // if (jwt) options.headers = {...options.headers, 'Authorization': jwt}
    // console.log('The options for ', endpoint, options)
    // console.log('The url: ',`${url}/${endpoint}`)
    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
        .catch(err => console.error(err))
}

export const get_adventures = () => {
  return (dispatch) => {
    resource('GET', 'all_adventures/').then((adventures) => {
      console.log(adventures)
      return dispatch({
        type: "GET_ADVENTURES",
        adventures
      })
    })
  }
}

export const add_adventure = (adventure, user) => {
  return (dispatch) => {
    let payload = {"title": adventure, "email": user.email}
    resource('POST', 'adventures', payload, localStorage.getItem('id_token')).then((result) => {
      // payload = {...payload, "_id": id, "poster": user.firstName}
      payload = result
      return dispatch({
        type: "ADD_ADVENTURE",
        payload
      })
    })
  }
}

export const remove_adventure = (adventure) => {
  return (dispatch) => {
    let jwt = localStorage.getItem('id_token')
    resource('DELETE', 'adventures/' + adventure._id, {jwt}).then((result) => {
      return dispatch({
        type: "REMOVE_ADVENTURE",
        adventure
      })
    })
  }
}

export const follow_adventure = (adventure, active_user) => {
  return (dispatch) => {
    let payload = {email: active_user.email}
    console.log(active_user)
    resource('POST', 'adventures/' + adventure._id, payload, localStorage.getItem('id_token')).then((result) => {
      return dispatch({
        type: "FOLLOW_ADVENTURE",
        adventure: result
      })
    })
  }
}

export const unfollow_adventure = (adventure, active_user) => {
  return (dispatch) => {
    let payload = {email: active_user.email}
    resource('POST', 'adventures/unfollow/' + adventure._id, payload, localStorage.getItem('id_token')).then((result) => {
      return dispatch({
        type: "UNFOLLOW_ADVENTURE",
        adventure: result
      })
    })
  }
}

// Login Methods
export const login_user = (email, password) => {
  return (dispatch) => {
    let payload = {"email": email, "password": password}
    resource('POST', 'login', payload).then((result) => {
      localStorage.setItem('id_token', result.token)
      return dispatch({
        type: "SWITCH_USER",
        user: result.user,
        token: result.token
      })
    })
  }
}

// export const request_protected_info = (token) => {
//   return (dispatch) => {
//     resource('GET', 'protected', {jwt: token}).then((result) => {
//       console.log(result)
//       return dispatch({
//         type: "TEST_USER"
//       })
//     })
//   }
// }

// export const switch_user = (user) => {
//   return (dispatch) => {
//     return dispatch({
//       type: "SWITCH_USER",
//       user
//     })
//   }
// }
