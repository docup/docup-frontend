import React from 'react';
import * as firebase from 'firebase';
import { Box, Button } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom';
import { Guest } from './components/Guest';
import { Private } from './components/Private';

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

firebase.auth().onAuthStateChanged(onChangeHandler);

function onChangeHandler(user: firebase.User | null) {
  console.log('user:' + user);
}

function handleGoogleLogin() {
  console.log(firebase.auth().currentUser);
}

const App2 = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Guest />
        </Route>
        <Route path="/private">
          <Private />
        </Route>
      </Switch>
      <div>
        <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
          Google login
        </Button>
      </div>
      <div>
        <Link to="/">To Top</Link>
      </div>
      <div>
        <Link to="/private">To Private</Link>
      </div>
    </BrowserRouter>
  );
};

export default App2;
