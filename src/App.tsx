import React from 'react';
import './App.css';
//import TopPageContainer from './containers/TopPageContainer';
import SignUpContainer from './containers/SignUpContainer';
import { FirebaseAuth, setGoogleAuthProvider } from './components/FirebaseAuth';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyACVCyQraCjymk-cFyA1PuKqGUtZ1Eh5hM',
  authDomain: 'soilworks-expt-01-266813.firebaseapp.com',
  databaseURL: 'https://soilworks-expt-01-266813.firebaseio.com',
  projectId: 'soilworks-expt-01-266813',
  storageBucket: 'soilworks-expt-01-266813.appspot.com',
  messagingSenderId: '580669126921',
  appId: '1:580669126921:web:4d53b03688d278c2a8bbd8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();

setGoogleAuthProvider(provider);

const App = () => {
  return (
    <React.Fragment>
      <FirebaseAuth />
    </React.Fragment>
  );
};

export default App;
