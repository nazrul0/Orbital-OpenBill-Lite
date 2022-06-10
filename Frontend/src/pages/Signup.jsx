import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import "./Login.css";
import Input from "../components/InputField";
import Button from "../components/SubmitButton";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  // destructuring the standard returns of useState- 1.the latest state 2. function to update the state
  // inside the useState call specify the initialisation state
  const [enteredEmail, updateEnteredEmail] = useState("");
  const [enteredPassword, updateEnteredPassword] = useState("");
  const [enteredDisplayName, updateEnteredDisplayName] = useState("");
  const { signup, pending, error } = useSignup();

  const emailChangeHandler = (event) => {
    updateEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    updateEnteredPassword(event.target.value);
  };

  const displayNameChangeHandler = (event) => {
    updateEnteredDisplayName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // calling the signup method we defined in the hook and returned to this file
    signup(enteredEmail, enteredPassword, enteredDisplayName);
  };

  // the element to return
  return (
    <div className="">
      <PageTitle title="Sign Up" />
      <div className="login_box">
        <form onSubmit={submitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            value={enteredEmail}
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

          <Input
            element="input"
            id="displayname"
            type="text"
            label="Display Name"
            value={enteredDisplayName}
            errortext="Please enter a valid display name"
            onChange={displayNameChangeHandler}
          ></Input>
          
          {!pending && <Button type="submit">Sign up</Button>}
          {pending && <Button disabled >Loading</Button>}
          {error && <p>{error}</p>}

        </form>
      </div>
    </div>
  );
}

export default Signup;