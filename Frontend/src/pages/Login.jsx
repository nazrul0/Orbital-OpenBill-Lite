import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "./Login.css";
import Input from "../components/InputField";
import Button from "../components/SubmitButton";
import { VALIDATOR_EMAIL } from "../util/validators.js";
import { useLogin } from "../hooks/useLogin";

function Login() {
  // destructuring the standard returns of useState- 1.the latest state 2. function to update the state
  // inside the useState call specify the initialisation state
  const [enteredEmail, updateEnteredEmail] = useState("");
  const [enteredPassword, updateEnteredPassword] = useState("");
  // simply importing does not work, need to destructure
  const {login, error, pending} = useLogin();

  const nav = useNavigate();
  
  const emailChangeHandler = (event) => {
    updateEnteredEmail(event.target.value);
    //console.log(enteredEmail);
  };

  const passwordChangeHandler = (event) => {
    updateEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // already an async func, as defined in the hook
    login(enteredEmail, enteredPassword);

    nav("/ProposalsHome");
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

          {!pending && <button type="submit" className="m-2 pl-5 pr-5 pt-1 pb-1 text-white rounded-full bg-indigo-500">Log in</button>}
          {pending && <button disabled >Loading</button>}
          {error && <p>{error}</p>}
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