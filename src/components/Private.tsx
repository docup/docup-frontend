import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Button, Box } from '@material-ui/core';
import axios from 'axios';
import { db } from '../App2';

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

export const Private: React.FC = () => {
  {
    const [authDone, setAuthDone] = useState<boolean>(false);
    const [userValue, setUserValue] = useState<any>(null);
    const [messageFromAPI, setMessageFromAPI] = useState<string>('');

    useEffect(() => {
      var done = false;
      firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
        if (!done) {
          console.log('onChangeHandler user private :' + user);
          setUserValue(user);
          setAuthDone(true);
        }
      });
      return function cleanup() {
        done = true;
      };
    });

    var callPrivateAPI = () => {
      firebase
        .auth()
        .currentUser?.getIdToken()
        .then(jwtToken => {
          var token = jwtToken;
          axios
            // .get('https://api-dot-docup-269111.appspot.com/private', {
            .get(process.env.REACT_APP_API_HOST + '/api/v1/private', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
              },
            })
            .then(response => {
              alert(response.data);
              setMessageFromAPI(response.data['message']);
            })
            .catch(error => {
              alert(error);
            });
        })
        .catch(error => {
          alert(error);
        });
    };

    console.log('user at private:' + firebase.auth().currentUser);
    console.log('setAuthDone:' + authDone);

    if (userValue == null && !authDone) {
      return <div>Loading</div>;
    }

    if (userValue == null) {
      return <Redirect to="/signin" />;
    }

    var user = userValue as firebase.User;
    return (
      <div>
        <div>MyPage {user.displayName}</div>
        <Box m={3} />
        <Button variant="contained" color="primary" onClick={signOut}>
          Sign out
        </Button>
        <Box m={3} />
        <div>Call private API</div>
        <Button variant="contained" color="primary" onClick={callPrivateAPI}>
          Call private API
        </Button>
        <div>Message from private API:{messageFromAPI}</div>
        <Box m={3} />

        <div>Operate firestore from client(frontend) directory</div>
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
