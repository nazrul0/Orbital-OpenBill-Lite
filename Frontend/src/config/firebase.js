import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { firebaseConfig } from "./connectionData";

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projFirestore = firebase.firestore();
const projAuth = firebase.auth();

// saving and exporting timestamp function from firebase
const timestamp = firebase.firestore.Timestamp;

export { projFirestore, projAuth, timestamp };
