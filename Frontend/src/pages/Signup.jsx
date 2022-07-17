import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import "./Login.css";
import Input from "../components/InputField";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import constellation from "../imgs/constellation.png";
import map from "../imgs/map.png";

function Signup() {
  // destructuring the standard returns of useState- 1.the latest state 2. function to update the state
  // inside the useState call specify the initialisation state
  const [enteredEmail, updateEnteredEmail] = useState("");
  const [enteredPassword, updateEnteredPassword] = useState("");
  const [enteredDisplayName, updateEnteredDisplayName] = useState("");
  const { signup, pending, error } = useSignup();
  const nav = useNavigate();

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

    // redirecting after signup
    nav("/ProposalsHome");
  };

  // the element to return
  return (
    <div className="bg-slate-100 h-screen pt-10">
      
      
      <div className="grid grid-cols-5 ">
        <img src={constellation} alt="Openbill Constellation" className="col-start-3 col-span-4 w-full pl-16"/>  
        
        <div className="login_box -mt-12 bg-indigo-500 text-white col-start-2 col-span-3 z-50">
          <PageTitle title="Sign Up" />
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
            
            {!pending && <button type="submit" className="my-4 bg-black text-white py-1 px-8 rounded-full font-title font-bold">Sign up</button>}
            {pending && <button disabled >Loading</button>}
            {error && <p>{error}</p>}

          </form>
        </div>
        <img src={constellation} alt="Openbill Constellation" className="col-start-1 col-span-3 w-full -mt-16 -ml-16"/>  
      </div>
      
    </div>
  );
}

export default Signup;