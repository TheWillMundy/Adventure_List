import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_user} from '../actions/index';

const Login = ({login_user}) => {
  let email, password
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!email.value.trim() || !password.value.trim()) {
            return
          }
          login_user(email.value, password.value)
          email.value = ''
          password.value = ''
        }}>
        <input ref={input_email => {email = input_email}} type="email"/>
        <input ref={input_password => {password = input_password}} type="password"/>
        <button type="submit">Login!</button>
      </form>
    </div>
  )
}
/*
{active_user.adv_list.map((adventure) => {
  return (
    <li>{adventure}</li>
  )
})}
*/
export default connect(
  (state) => {
    return {

    }
  },
  (dispatch) => {
    return {
      login_user: (email, password) => dispatch(login_user(email, password))
    }
  }
)(Login);
