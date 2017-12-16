import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {add_adventure, remove_adventure, follow_adventure, unfollow_adventure} from '../actions/index'
// import {selectUser} from '../actions/index';
// MUI Imports
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

const AdventureList = ({adv_list, active_user, add_adventure, remove_adventure, follow_adventure, unfollow_adventure}) => {
  let input
  console.log(active_user)
  return (
    <div style={{display: 'inline-block'}}>
      <FollowButton follow={true} active_user={active_user} adv_list={adv_list} remove_adventure={remove_adventure} follow_adventure={follow_adventure} unfollow_adventure={unfollow_adventure} />
      {active_user.firstName != undefined ?
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          add_adventure(input.value, active_user)
          input.value = ''
        }}>
        <input ref={adventure => {input = adventure}}/>
        <button type="submit">Add Adventure</button>
      </form> : <span> Please sign in before adding adventures. </span> }
    </div>
  )
}

/*
<ul>
  {adv_list.map((adventure) => {
    return (
      <div key={adventure.title}>
        <li>{adventure.title} by {adventure.postedBy.profile.firstName}, followed by: {adventure.followedBy.map((user) => { if (user.profile != undefined) {return (<p style={{display: 'inline-block'}}>{user.profile.firstName}</p>)}})}</li>
        {active_user.email != undefined ?
          <div>
            <button type="button" disabled={adventure.postedBy.email != active_user.email} onClick={() => remove_adventure(adventure)}>Remove</button>
            <button type="button" disabled={adventure.followedBy.find((user) => user.email == active_user.email) != undefined} onClick={() => follow_adventure(adventure, active_user)}>Follow</button>
          </div> : ""}
      </div>
    )
  })}
</ul>
*/
// const FollowedByButton = ({follower_list}) => {
//   return (
//     {follower_list.map((user) => {
//       return (
//         <ListItem
//           key={user.profile.firstName}
//           primaryText={user.profile.firstName}
//           />
//       )
//     })}
//   )
// }

// const FollowButton = ({}) => {
//   const isLoggedIn = (active_user) => {
//     if (active_user.email == undefined) {
//       return false;
//     }
//     return true;
//   }
//
//   const isPosterOrFollowing = (adventure, active_user) => {
//     if (adventure.postedBy.email == active_user.email) {
//       return ( <IconButton style={{display: 'inline-flex'}} disabled={adventure.postedBy.email != active_user.email} onClick={() => remove_adventure(adventure)}><RemoveCircle /></IconButton> )
//     }
//     else {
//       if (isLoggedIn(active_user)) {
//         if (adventure.followedBy.find(user) => user.email == active_user.email) == undefined) {
//           return (<IconButton style={{display: 'inline-flex'}} onClick={() => follow_adventure(adventure, active_user)}><AddCircle /></IconButton>)
//         }
//         return (<IconButton style={{display: 'inline-flex'}} onClick={() => unfollow_adventure(adventure, active_user)}><CheckCircle /></IconButton>)
//       }
//       return ""
//     }
//   }
//   return (
//     {adv_list.map((adventure) => {
//       return (
//         <div style={{display: 'flex'}}>
//           {isPosterOrFollowing(adventure, active_user)}
//
//         </div>
//       )
//     })}
//   )
// }

const FollowButton = ({follow, active_user, adv_list, follow_adventure, remove_adventure, unfollow_adventure}) => {
  const isLoggedIn = (active_user) => {
    if (active_user.email == undefined) {
      return false;
    }
    return true;
  }

  const isPosterOrFollowing = (adventure, active_user) => {
    if (isLoggedIn(active_user)) {
      if (adventure.postedBy.email == active_user.email) {
        return ( <IconButton style={{display: 'inline-flex'}} disabled={adventure.postedBy.email != active_user.email} onClick={() => remove_adventure(adventure)}><RemoveCircle /></IconButton> )
      }
      else {
        if (adventure.followedBy.find((user) => user.email == active_user.email) == undefined) {
          return (<IconButton style={{display: 'inline-flex'}} onClick={() => follow_adventure(adventure, active_user)}><AddCircle /></IconButton>)
        }
        return (<IconButton style={{display: 'inline-flex'}} onClick={() => unfollow_adventure(adventure, active_user)}><CheckCircle /></IconButton>)
      }
    }
    else {
      return ""
    }
  }

  return (
    <List style={{display: 'center'}}>
      {adv_list.map((adventure) => {
        return (
          <div style={{display: 'flex'}}>
            {isPosterOrFollowing(adventure, active_user)}
            <ListItem
              key={adventure.title}
              primaryText={adventure.title}
              secondaryText={adventure.postedBy.profile.firstName}
              nestedItems={
                adventure.followedBy.map((user) => {
                  return (
                    <ListItem
                      key={user.profile.firstName}
                      primaryText={user.profile.firstName}
                      />
                  )
                })
              }
              />
          </div>
        )
      })}
    </List>
  )
}

export default connect(
    (state) => {
        return {
            adv_list: state.adv_list_reducer.adv_list,
            active_user: state.active_user_reducer.active_user
        }
    },
    (dispatch) => {
      return {
        get_adventures: () => dispatch(get_adventures()),
        add_adventure: (adventure, active_user) => dispatch(add_adventure(adventure, active_user)),
        remove_adventure: (adventure) => dispatch(remove_adventure(adventure)),
        follow_adventure: (adventure, active_user) => dispatch(follow_adventure(adventure, active_user)),
        unfollow_adventure: (adventure, active_user) => dispatch(unfollow_adventure(adventure, active_user))
      }
    }
)(AdventureList)
