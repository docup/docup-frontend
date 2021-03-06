import React from 'react';
import { TextInput } from './TextInput';
import { TopPageHandler } from '../containers/TopPageContainer';
import { RadioInput } from './RadioInput';
import { ShowState } from './ShowState';
import { SubmitButton } from './SubmitButton';
import Box from '@material-ui/core/Box';
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
    //.get('https://api-dot-docup-269111.appspot.com/api', {
    .get(process.env.REACT_APP_API_HOST + '/api', {
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

function handleCallPublicAPI() {
  axios
    //.get('https://api-dot-docup-269111.appspot.com/guest', {
    .get(process.env.REACT_APP_API_HOST + '/api/v1/guest', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      alert(JSON.stringify(response.data));
    })
    .catch(error => {
      alert(error);
    });
}

export class Site extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Box component="div" m={1}>
          Public Page (Site top2)
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCallPublicAPI}
        >
          Call Public API
        </Button>
        <Box component="div" m={1}>
          <a href="mypage">Go to mypage</a>
        </Box>
      </React.Fragment>
    );
  }
}
