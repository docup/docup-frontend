import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Box, Button } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom';
import { Guest } from './components/Guest';
import Guest2 from './components/Guest2';
import { Private } from './components/Private';
import { Signin2 } from './components/Signin2';
import SignIn3 from './components/SignIn3';
import SignUp2 from './components/SignUp2';
import Developer from './components/Developer';
import SignUpPhoneNumber from './components/SignUpPhoneNumber';
import SignInWithEmailLink from './components/SignInWithEmailLink';
import Personal from './components/Personal';
import dd from './datadog';

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
firebase.auth().useDeviceLanguage();

export const db = firebase.firestore();

function postform() {
  db.collection('contact')
    .add({
      email: 'tanaka@docup.jp',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function() {
      console.log('Document written with ID: ');
      alert('ok');
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}

function readform() {
  db.collection('form')
    .doc('tanaka@docup.jp')
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      alert(error);
      console.log('Error getting document:', error);
    });
}

dd.info('application started');

const App2: React.FC = props => {
  // const useDidMount = (func: Function) =>
  //   useEffect(() => {
  //     return func();
  //   }, []);

  // const [authChecked, setAuthCheched] = useState(false);

  // useDidMount(() => {
  //   const unsubscribe = firebase
  //     .auth()
  //     .onAuthStateChanged((user: firebase.User | null) => {
  //       const d = new Date();
  //       console.log(d);
  //       console.log(d.getMilliseconds());
  //       setAuthCheched(true);
  //     });
  //   return () => unsubscribe();
  // });

  //  if (authChecked) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Guest2 text={'hoge'} />
        </Route>
        <Route path="/signin">
          <SignIn3 />
        </Route>
        <Route path="/signup">
          <SignUp2
            onSignIn={() => {
              window.location.replace('/');
            }}
          />
        </Route>
        <Route path="/signup-phone">
          <SignUpPhoneNumber />
        </Route>
        <Route path="/signinwithemaillink">
          <SignInWithEmailLink />
        </Route>
        <Route path="/personal">
          <Personal />
        </Route>
        <Route path="/developer">
          <Developer />
        </Route>
        <Route path="/private">
          <Private />
        </Route>
      </Switch>
    </BrowserRouter>
  );
  // } else {
  //   return <div></div>;
  // }
};

export default App2;
