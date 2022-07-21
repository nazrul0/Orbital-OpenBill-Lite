import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "./Login.css";
import Input from "../components/InputField";
import { VALIDATOR_EMAIL } from "../util/validators.js";
//import { useLogin } from "../hooks/useLogin";
import constellation from "../imgs/constellation.png";
import { useEffect } from "react";
import { projAuth, projFirestore } from "../config/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useCrud } from "../hooks/useCRUD";

function Login(props) {
  // destructuring the standard returns of useState- 1.the latest state 2. function to update the state
  // inside the useState call specify the initialisation state
  const [enteredEmail, updateEnteredEmail] = useState("");
  const [enteredPassword, updateEnteredPassword] = useState("");
  // simply importing does not work, need to destructure
  //const { login, error, pending } = useLogin();
  const [currUser, setCurrUser] = useState(null);
  
  const { dispatch } = useAuthContext();
  const { addDoc } = useCrud("UserData");

  let ref = projFirestore.collection("UserData");

  const nav = useNavigate();

  const emailChangeHandler = (event) => {
    updateEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    updateEnteredPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
            
    await signInWithPopup(auth, provider)
        .then((res) => {
            // The signed-in user info.
            console.log(res.user)
            setCurrUser(res.user)

            var docRef = ref.where("Uid", "==", currUser.uid);
            docRef.get().then( (doc) => {
              if(doc.empty){
              console.log("empty doc")
              addDoc({
                Uid: currUser.uid,
                UpvotedOn: [],
                Privileged: false
              });
              dispatch( {type: 'ADMIN_LOGIN', payload: currUser})
              return;
            }
            else if(doc.get("Privileged")){
              // casting off a login for privileged user
              dispatch( {type: 'ADMIN_LOGIN', payload: currUser})
              return;
            }
            else{
              dispatch( {type: 'ADMIN_LOGIN', payload: currUser})
            }
        })

            
        }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage)
        });

    // already an async func, as defined in the hook
    //login(enteredEmail, enteredPassword);
  };

  useEffect(() => {
    console.log("hi")
    if(currUser !== null){
      console.log("hihi")

      // async function fetchDocs() {
      //   console.log("trig")
      //   var docRef = ref.select("id").where("Uid", "==", currUser.uid);
      //   docRef.get().then( (doc) => {
      //     if(doc.empty){
      //       console.log("empty doc")
      //       addDoc({
      //         Uid: currUser.uid,
      //         UpvotedOn: [],
      //         Privileged: false
      //       });
      //       dispatch( {type: 'ADMIN_LOGIN', payload: currUser})
      //       return;
      //     }
      //     else if(doc.get("Privileged")){
      //       // casting off a login for privileged user
      //       dispatch( {type: 'ADMIN_LOGIN', payload: currUser})
      //       return;
      //     }
      //     else{
      //       dispatch( {type: 'ADMIN_LOGIN', payload: currUser})
      //     }
      //   })
      // }
      // fetchDocs(); 
      //nav("/ProposalsHome")
    }
  }, [currUser, ref, dispatch]);

  

  // the element to return
  return (
    <div className="bg-slate-100 h-screen pt-10">
      <div className="grid grid-cols-5 ">
        <img
          src={constellation}
          alt="Openbill Constellation"
          className="col-start-3 col-span-4 w-full pl-16"
        />

        <div className="mt-32 sm:mt-28 md:mt-20 lg:mt-0" />

        <img
          src={constellation}
          alt="Openbill Constellation"
          className="col-start-1 col-span-3 w-full mt-48"
        />

        <div className="login_box -mt-96 bg-indigo-500 text-white col-start-2 col-span-3 ">
          <PageTitle title="Log in" />
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

            { (
              <button
                type="submit"
                className="my-4 bg-black text-white py-1 px-8 rounded-full font-title font-bold"
              >
                Log in
              </button>
            )}
            
          </form>
        </div>

        {/* <img
          src={constellation}
          alt="Openbill Constellation"
          className="col-start-1 col-span-3 w-full -mt-16 -ml-16 z-10"
        /> */}
      </div>

      <div className="text-center pb-8 mt-20 font-main font-semibold ">
        <p>Don't have an account?</p>
        <Link className="navItem" to="/Signup">
          <button className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
