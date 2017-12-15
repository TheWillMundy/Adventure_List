import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index';

const MyAdventures = ({active_user}) => {
  return (
    <div>
      <h1>Hello, {active_user.firstName != undefined ? active_user.firstName : <span style={{color: 'red'}}>please sign in.</span>}</h1>
      {active_user.adventures != undefined ? active_user.adventures.map((adventure) => {
        return (
          <div key={adventure.title}>
            <li>{adventure.title}</li>
            <button type="button" onClick={() => remove_adventure(adventure)}>Remove</button>
          </div>
        )
      }) : ""}
    </div>
  )
}

export default connect(
  (state) => {
    return {
      active_user: state.active_user_reducer.active_user
    }
  },
  (dispatch) => {
    return {
      // switch_user: (user) => dispatch(switch_user(user))
    }
  }
)(MyAdventures);
