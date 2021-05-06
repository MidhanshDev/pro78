import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyAYP3aelXMNwEinfX2jNfw-O8mG072bYEE",
  authDomain: "bartersystem-30914.firebaseapp.com",
  projectId: "bartersystem-30914",
  storageBucket: "bartersystem-30914.appspot.com",
  messagingSenderId: "148547387164",
  appId: "1:148547387164:web:9537f87a1b537fb7f444d9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
