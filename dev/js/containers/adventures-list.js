import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {add_adventure, remove_adventure} from '../actions/index'
// import {selectUser} from '../actions/index';

const AdventureList = ({adv_list, active_user, add_adventure, remove_adventure}) => {
  let input
  console.log(active_user)
  return (
    <div>
      <ul>
        {adv_list.map((adventure) => {
          return (
            <div key={adventure.title}>
              <li>{adventure.title} by {adventure.postedBy.profile.firstName}</li>
              <button type="button" onClick={() => remove_adventure(adventure)}>Remove</button>
            </div>
          )
        })}
      </ul>
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

// function mapStateToProps(state) {
//   return {
//
//   };
// }


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
        remove_adventure: (adventure) => dispatch(remove_adventure(adventure))
      }
    }
)(AdventureList)
