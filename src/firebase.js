// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBBI-oXWPZn99uCek-FXrKYjbsQgnesoOY",
  authDomain: "messenger-2df57.firebaseapp.com",
  databaseURL: "http://messenger-2df57.firebaseio.com",
  projectId: "messenger-2df57",
  storageBucket: "messenger-2df57.appspot.com",
  messagingSenderId: "667316729882",
  appId: "1:667316729882:web:2789d74e2eef4c2b5939a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)
const storage=getStorage(app)
export {auth,db,storage};