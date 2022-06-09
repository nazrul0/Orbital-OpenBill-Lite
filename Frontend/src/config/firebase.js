import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCrHHBrTfd_nMNygpkxOML2D_DR52nyORo",
    authDomain: "openbill-v1-7e53f.firebaseapp.com",
    projectId: "openbill-v1-7e53f",
    storageBucket: "openbill-v1-7e53f.appspot.com",
    messagingSenderId: "204109232730",
    appId: "1:204109232730:web:646e866e7ec716dc38b663",
    measurementId: "G-9BDJT1LXZ0"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projFirestore = firebase.firestore();
const projAuth = firebase.auth();

export { projFirestore, projAuth };
