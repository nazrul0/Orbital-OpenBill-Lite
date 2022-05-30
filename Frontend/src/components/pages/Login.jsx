import React from "react";
import PageTitle from "../PageTitle";
import './Login.css';
import Input from '../templates/input.js';
import Button from '../templates/Button.js';
import { VALIDATOR_EMAIL } from "../util/validators.js";


function Login() {
  // some logic
  let entered_text = '';

  const textChangeHandler = event => {
    entered_text = event.target.value;
    console.log(entered_text);
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log("test");
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
            validators = {[VALIDATOR_EMAIL()]}
            errortext = "Please enter a valid email address"
            onChange = {textChangeHandler}
          >
          </Input>

          <Input
            element = "input"
            id = "password"
            type = 'text'
            label = 'Password'
            errortext = "Please enter a valid password"
            onChange = {textChangeHandler}
          >
          </Input>

          <Button type="submit">Sign up.</Button>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
