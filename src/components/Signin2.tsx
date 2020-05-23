import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Button, Box } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

var provider: firebase.auth.GoogleAuthProvider;

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

function handleGoogleLogin() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result: any) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
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
  var u = firebase.auth().currentUser;
  if (u == null) {
    alert('logout-ed');
  }

  firebase
    .auth()
    .currentUser?.getIdToken()
    .then(jwtToken => {
      var token = jwtToken;
      alert(token);
    })
    .catch(error => {
      alert(error);
    });

  //alert(firebase.auth().currentUser?.displayName);
}

export const Signin2: React.FC = () => {
  {
    useEffect(() => {
      provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().useDeviceLanguage();
    });
    return (
      <div>
        <div>Sign-in2</div>
        <Button variant="contained" color="primary" onClick={handleEmailLogin}>
          Email login
        </Button>
        <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
          Google login
        </Button>
        <Button variant="contained" color="primary" onClick={checkAuth}>
          Check auth
        </Button>
      </div>
    );
  }
};
