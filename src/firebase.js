import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAVn3PUDRjk1MpPsXiwyufj0MPIOUvfRjM",
  authDomain: "little-birdie-30499.firebaseapp.com",
  projectId: "little-birdie-30499",
  storageBucket: "little-birdie-30499.appspot.com",
  messagingSenderId: "710747758123",
  appId: "1:710747758123:web:d47e6d81d04684d6b2946e",
  measurementId: "G-G6QQBRQPQB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
