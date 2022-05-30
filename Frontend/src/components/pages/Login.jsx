import React, { useState } from 'react';
import PageTitle from "../PageTitle";
import './Login.css';
import Input from '../templates/input.js';
import Button from '../templates/Button.js';
import { VALIDATOR_EMAIL } from "../util/validators.js";


function Login() {
  // destructuring the standard returns of useState- 1.the latest state 2. function to update the state
  // inside the useState call specify the initialisation state
  const [enteredEmail, updateEnteredEmail] = useState('');
  const [enteredPassword, updateEnteredPassword] = useState('');

  const emailChangeHandler = event => {
    updateEnteredEmail(event.target.value);
    console.log(enteredEmail);
  };

  const passwordChangeHandler = event => {
    updateEnteredPassword(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();
    
    const new_user = {
      id: enteredEmail,
      password: enteredPassword
    }

    console.log(new_user);
  }
  
  // the element to return
  return (
    <div className="">
      <PageTitle title="Login or Sign Up" />
      <div className="login_box">
        <form onSubmit={submitHandler}>
          <Input
            element = "input"
            id = "email"
            type = 'email'
            label = 'E-mail'
            value = {enteredEmail}
            validators = {[VALIDATOR_EMAIL()]}
            errortext = "Please enter a valid email address"
            onChange = {emailChangeHandler}
          >
          </Input>

          <Input
            element = "input"
            id = "password"
            type = 'text'
            label = 'Password'
            value = {enteredPassword}
            errortext = "Please enter a valid password"
            onChange = {passwordChangeHandler}
          >
          </Input>

          <Button type="submit">Sign up.</Button>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
