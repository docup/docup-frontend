import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Button, Box } from '@material-ui/core';
import axios from 'axios';

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
            .get(process.env.REACT_APP_API_HOST + '/api/private', {
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
        <div>Private PAGE {user.displayName}</div>
        <Button variant="contained" color="primary" onClick={signOut}>
          Sign out
        </Button>
        <Button variant="contained" color="primary" onClick={callPrivateAPI}>
          Call private API
        </Button>
        <div>Message from private API:{messageFromAPI}</div>
      </div>
    );
  }
};
