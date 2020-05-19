import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDlZqwREge9TIPZaFcwOaHNbUX6WLGrH0Y",
    authDomain: "share-me-da1ec.firebaseapp.com",
    databaseURL: "https://share-me-da1ec.firebaseio.com",
    projectId: "share-me-da1ec",
    storageBucket: "share-me-da1ec.appspot.com",
    messagingSenderId: "150219235308",
    appId: "1:150219235308:web:9f511c7d170982a1e82ac9",
    measurementId: "G-90XGGVKKE7"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  firebase.analytics();
  export default firebaseApp.firestore();