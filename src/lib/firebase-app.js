import { initializeApp as firebaseInit} from "firebase/app";
import { createUserWithEmailAndPassword, getAuth as getAuthOfApp } from "firebase/auth";

// Firebase config needed to initialize Firebase app
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

// Initializing Firebase App
const FirebaseApp = firebaseInit(firebaseConfig)

/**************************/
/********* UTILS **********/
/**************************/

// SignUp with email and password util.
const SignUpWithEmailPassword = (email, password) => {
    
    // TODO: Response Management of SignUpWithEmailPassword Util
    createUserWithEmailAndPassword(getAuthOfApp(FirebaseApp), email, password)
        .then(user => {
            console.log('user', user)
        })
        .catch(err => {
            console.log('code', err.code)
            console.log('message', err.message)
        })
}

/**********************************/
/************* EXPORTS ************/
/**********************************/

export {
    FirebaseApp,
    SignUpWithEmailPassword
}
  

