import React from 'react';
import './App.css';
//import TopPageContainer from './containers/TopPageContainer';
import SignUpContainer from './containers/SignUpContainer';
import { FirebaseAuth, setGoogleAuthProvider } from './components/FirebaseAuth';
import { Site } from './components/Site';
import { MyPage } from './components/Mypage';
import { SignIn } from './components/SignIn';
import * as firebase from 'firebase';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

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

// ここを切り替えることでmypageにアクセスした時にそのままmypageが表示されるか、/firebaseauthページに飛ばされるかコントロールできる。
// この時点でfirebase.auth()を使ってログイン状態を判断したかったが、非同期処理なのか常にnullが返ってきてしまうので実現できずに終わっている(2020/05/23)
const isAuthenticated = false;
//var user = firebase.auth().currentUser;
//alert(user?.getIdToken());
//const isAuthenticated = user != null;

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Site} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/firebaseauth" exact component={FirebaseAuth} />
          <Route
            path="/mypage"
            render={props =>
              isAuthenticated ? (
                <MyPage {...props} />
              ) : (
                <Redirect to="/firebaseauth" />
              )
            }
          />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
