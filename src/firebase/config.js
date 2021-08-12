// Your web app's Firebase configuration
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAshGdp3hysEJ_YX9Rd4Q2m1dsFBwsCP-Y",
    authDomain: "dobrokratingz.firebaseapp.com",
    projectId: "dobrokratingz",
    storageBucket: "dobrokratingz.appspot.com",
    messagingSenderId: "651725754590",
    appId: "1:651725754590:web:588818dbdd1684a8fd324f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectFirestore, projectAuth, timestamp };