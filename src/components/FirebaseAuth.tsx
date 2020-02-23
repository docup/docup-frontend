import React from 'react';
import { TextInput } from './TextInput';
import { TopPageHandler } from '../containers/TopPageContainer';
import { RadioInput } from './RadioInput';
import { ShowState } from './ShowState';
import { SubmitButton } from './SubmitButton';
import Button from '@material-ui/core/Button';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import axios from 'axios';

var token: string;

function handleEmailLogin() {
  firebase
    .auth()
    .signInWithEmailAndPassword('tanaka@soil-works.jp', 'hogehogehoge')
    .then(function(result: any) {
      window.alert(result);
    })
    .catch(function(error) {
      window.alert(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

var provider: firebase.auth.GoogleAuthProvider;
export function setGoogleAuthProvider(p: firebase.auth.GoogleAuthProvider) {
  provider = p;
}
function handleGoogleLogin() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result: any) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      window.alert(token + ':' + user);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(error);
    });
}

function checkAuth() {
  firebase
    .auth()
    .currentUser?.getIdToken()
    .then(jwtToken => {
      token = jwtToken;
      alert(token);
    })
    .catch(error => {
      alert(error);
    });

  //alert(firebase.auth().currentUser?.displayName);
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      alert('signout');
    })
    .catch(function(error) {
      alert(error);
    });
}

function apiGet() {
  axios
    .get('https://endpoints-runtime-serverless-g7vn673b6q-an.a.run.app/api', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      alert(error);
    });
}

export class FirebaseAuth extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={handleEmailLogin}>
          Email login
        </Button>
        <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
          Google login
        </Button>
        <Button variant="contained" color="primary" onClick={checkAuth}>
          Check auth
        </Button>
        <Button variant="contained" color="primary" onClick={signOut}>
          Sign out
        </Button>
        <Button variant="contained" color="primary" onClick={apiGet}>
          API Get
        </Button>
      </React.Fragment>
    );
  }
}
