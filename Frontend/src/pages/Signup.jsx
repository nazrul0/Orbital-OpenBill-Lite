import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import "./Login.css";
//import Input from "../components/InputField";
//import { VALIDATOR_EMAIL } from "../util/validators.js";
//import { useLogin } from "../hooks/useLogin";
import constellation from "../imgs/constellation.png";
import { projFirestore } from "../config/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useCrud } from "../hooks/useCRUD";

function Signup() {
  const { dispatch } = useAuthContext();
  const { addDoc } = useCrud("UserData");

  let ref = projFirestore.collection("UserData");

  const nav = useNavigate();
  

  const submitHandler = async (event) => {
    event.preventDefault();

    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({
      prompt: "select_account",
    });
    
    const auth = getAuth();
            
    await signInWithPopup(auth, provider)
    .then((res) => {
      //console.log(res.user)

      // gets a reference to all documents from UserData that match criteria
      const docRef = ref.where("Uid", "==", res.user.uid).get();
      
      // async therefore need .then()
      docRef
      .then( (docs) => {
        if(docs.empty === true){
          console.log(docs.empty)
          // create supplementary data
          addDoc({
            Uid: res.user.uid,
            UpvotedOn: [],
            Privileged: false
          });
          dispatch( {type: 'LOGIN', payload: res.user})
          return;
        }else{
          docs.forEach( doc => {
            // checking Privileged field of a doc
            if(doc.data().Privileged){
              console.log("privileged login")
              dispatch( {type: 'ADMIN_LOGIN', payload: res.user})
            }else{
              dispatch( {type: 'LOGIN', payload: res.user})
            }
          })
        }
      })  
      return;
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      console.log(errorMessage)
    });

  };

  // the element to return
  return (
    <div className="bg-slate-100 pb-48 pt-10">
      <div className="grid grid-cols-5 ">
        <img
          src={constellation}
          alt="Openbill Constellation"
          className="col-start-3 col-span-4 w-full pl-16"
        />

        {/* A SELF CLOSING DIV TAG BELOW */}
        <div className="mt-36 sm:mt-28 md:mt-22 lg:mt-8 xl:mt-4" />
        <img
          src={constellation}
          alt="Openbill Constellation"
          className="col-start-1 col-span-3 w-full mt-48"
        />
          
        <div className="login_box -mt-96 bg-indigo-500 text-white col-start-2 col-span-3 ">
          <PageTitle title="Log in" />
          <button onClick={submitHandler} className="my-4 bg-black text-white py-1 px-8 rounded-full font-title font-bold">
            Sign up/ Login with Google
          </button>
          <p className="mt-8 md:px-16 sm:px-8 px-4 text-sm font-main font-light">
            Since v0.9, we've switched to Google for a more secure and seamless sign-in experience
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
