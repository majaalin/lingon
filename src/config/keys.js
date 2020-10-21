import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhflAdWC_SfQNHc0Bfnfs50YXUxyxQJok",
  authDomain: "lingon-efa1f.firebaseapp.com",
  databaseURL: "https://lingon-efa1f.firebaseio.com",
  projectId: "lingon-efa1f",
  storageBucket: "lingon-efa1f.appspot.com",
  messagingSenderId: "1096786685361",
  appId: "1:1096786685361:web:34d7fbb8e5e0c73ebc2190",
  measurementId: "G-14SESQM186",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
