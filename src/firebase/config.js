import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy1IFEqs1IOTKk-NNMNGUutfWFZYW4Y2o",
  authDomain: "todo-c4e2e.firebaseapp.com",
  projectId: "todo-c4e2e",
  storageBucket: "todo-c4e2e.appspot.com",
  messagingSenderId: "298347745273",
  appId: "1:298347745273:web:3b7c17eeb338078c663728",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, timestamp };
