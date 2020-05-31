import React from 'react';
import * as firebase from 'firebase';
import { Box, Button } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom';
import { Guest } from './components/Guest';
import { Private } from './components/Private';
import { Signin2 } from './components/Signin2';

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

// private pageに遷移した時に待ちが発生しないよう、ここで認証を走らせておく。そうするとprivateのpageが表示された直後にfirebase.auth().currentUserにアクセスできるようになる
firebase.auth().onAuthStateChanged((user: firebase.User | null) => {});

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
        alert('ok');
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

const App2 = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Guest />
        </Route>
        <Route path="/signin">
          <Signin2 />
        </Route>
        <Route path="/private">
          <Private />
        </Route>
      </Switch>
      <div>-----------------------</div>
      <div>
        <Button variant="contained" color="primary" onClick={postform}>
          Post form
        </Button>
      </div>
      <Box m={2} />
      <div>
        <Button variant="contained" color="primary" onClick={readform}>
          Read form
        </Button>
      </div>
      <Box m={4} />
      <div>
        <Link to="/">To Top</Link>
      </div>
      <div>
        <Link to="/signin">To Signin</Link>
      </div>
      <div>
        <Link to="/private">To Private</Link>
      </div>
    </BrowserRouter>
  );
};

export default App2;
