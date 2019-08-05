import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA7qQ74sQC5pRMzd3WrwbZmM8XIOTxi9Fs",
  authDomain: "wisecurity.firebaseapp.com",
  databaseURL: "https://wisecurity.firebaseio.com",
  projectId: "wisecurity",
  storageBucket: "",
  messagingSenderId: "409314073011",
  appId: "1:409314073011:web:05d5ed8dd3a6c97c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
firestore.enablePersistence({ synchronizeTabs: true }).catch(function(err) {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    console.log(err);
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    console.log(err);
  }
});
export const auth = firebase.auth();
