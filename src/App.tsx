import React from 'react';
import './App.css';
//import TopPageContainer from './containers/TopPageContainer';
import SignUpContainer from './containers/SignUpContainer';
import { FirebaseAuth, setGoogleAuthProvider } from './components/FirebaseAuth';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBQzMyPZ6eVB7YpV-l7rFvlUCs35ZkghjE',
  authDomain: 'docup-269111.firebaseapp.com',
  databaseURL: 'https://docup-269111.firebaseio.com',
  projectId: 'docup-269111',
  storageBucket: 'docup-269111.appspot.com',
  messagingSenderId: '965242496332',
  appId: '1:965242496332:web:353eb0b12f8570d98e5be9',
  measurementId: 'G-51NS0WSMZW',
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
