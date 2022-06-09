import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "./Login.css";
import Input from "../components/InputField";
import Button from "../components/SubmitButton";
import { VALIDATOR_EMAIL } from "../util/validators.js";

function Login() {
  // destructuring the standard returns of useState- 1.the latest state 2. function to update the state
  // inside the useState call specify the initialisation state
  const [enteredEmail, updateEnteredEmail] = useState("");
  const [enteredPassword, updateEnteredPassword] = useState("");

  const emailChangeHandler = (event) => {
    updateEnteredEmail(event.target.value);
    //console.log(enteredEmail);
  };

  const passwordChangeHandler = (event) => {
    updateEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const new_user = {
      id: enteredEmail,
      password: enteredPassword,
    };

    console.log(new_user);
  };

  // the element to return
  return (
    <div className="">
      <PageTitle title="Login or Sign Up" />
      <div className="login_box">
        <form onSubmit={submitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            value={enteredEmail}
            validators={[VALIDATOR_EMAIL()]}
            errortext="Please enter a valid email address"
            onChange={emailChangeHandler}
          ></Input>

          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            value={enteredPassword}
            errortext="Please enter a valid password"
            onChange={passwordChangeHandler}
          ></Input>

          <Button type="submit">Log in</Button>
        </form>
      </div>
      <div className="center">
          <p>Don't have an account?</p>
          <Link className="navItem" to="/Signup">
            Sign up
          </Link>
      </div>
    </div>
  );
} 

export default Login;