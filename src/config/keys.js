import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB3CE5XvAQripG33Gqt4ulAbZ9fB3OwH_M',
  authDomain: 'lingon-app-5b652.firebaseapp.com',
  databaseURL: 'https://lingon-app-5b652.firebaseio.com',
  projectId: 'lingon-app-5b652',
  storageBucket: 'lingon-app-5b652.appspot.com',
  messagingSenderId: '465688609238',
  appId: '1:465688609238:web:c014d3ef33ae6a8700e477',
  measurementId: 'G-HE953G396L',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
