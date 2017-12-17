import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {login_user} from '../actions/index';

const CheckLogin = ({login_user}) => {
  const isLoggedIn = () => {
    if (localStorage.getItem('id_token') == null) {
      return false
    }
    else {
      // JWT Token Action 
    }
  }
  return (
    <div>

    </div>
  )
}

export default connect(
  (state) => {
    return {

    }
  },
  (dispatch) => {
    return {
      // login_user: (email, password) => dispatch(login_user(email, password))
    }
  }
)(CheckLogin);
