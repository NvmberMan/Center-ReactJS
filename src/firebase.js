import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import "firebase/compat/database";


const firebaseConfig = {
  apiKey: "AIzaSyCa7Kf45fiKxw-GLqeM3L8O2lS0NaY2qxI",
  authDomain: "central-45d33.firebaseapp.com",
  projectId: "central-45d33",
  storageBucket: "central-45d33.appspot.com",
  messagingSenderId: "383615496959",
  appId: "1:383615496959:web:1d83d2147a519fadf652ca",
  measurementId: "G-D691VZ327M",
};

// Initialize Firebase app
const fireBase = firebase.initializeApp(firebaseConfig);

export const auth = fireBase.auth();
export const database = fireBase.database();


export default fireBase;
