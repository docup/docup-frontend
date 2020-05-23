import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export const Private: React.FC = () => {
  {
    const [authDone, setAuthDone] = useState<boolean>(false);
    const [userValue, setUserValue] = useState<any>(null);

    useEffect(() => {
      var done = false;
      var unsubscribe = firebase
        .auth()
        .onAuthStateChanged((user: firebase.User | null) => {
          console.log('onChangeHandler user private :' + user);
          if (!done) {
            setUserValue(user);
            setAuthDone(true);
          }
        });

      return function cleanup() {
        done = true;
      };
    });

    console.log('user at private:' + firebase.auth().currentUser);
    console.log('setAuthDone:' + authDone);

    if (userValue == null && !authDone) {
      return <div>Loading</div>;
    }

    if (userValue == null) {
      return <Redirect to="/signin" />;
    }

    var user = userValue as firebase.User;
    return <div>Private PAGE {user.displayName}</div>;
  }
};
