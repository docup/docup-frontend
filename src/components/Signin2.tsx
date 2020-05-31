import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Button, Box } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { db } from '../App2';

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

      console.log(firebase.auth().currentUser?.uid);
    })
    .catch(error => {
      alert(error);
    });

  //alert(firebase.auth().currentUser?.displayName);
}

function setUserInfo() {
  if (firebase.auth().currentUser == null) {
    alert('not logined');
    return;
  }
  let uid = firebase.auth().currentUser?.uid;

  db.collection('users')
    .doc(uid)
    .set({
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

function readUserInfo() {
  if (firebase.auth().currentUser == null) {
    alert('not logined');
    return;
  }
  let uid = firebase.auth().currentUser?.uid;

  db.collection('users')
    .doc(uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        alert('ok:' + doc.data());
        console.log('Document data:', doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
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
        <Button variant="contained" color="primary" onClick={setUserInfo}>
          Update user info
        </Button>
        <Button variant="contained" color="primary" onClick={readUserInfo}>
          Read user info
        </Button>
      </div>
    );
  }
};
