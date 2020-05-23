import React, { useState } from 'react';
import * as firebase from 'firebase';

export const Private: React.FC = () => {
  {
    const [userValue, setUserValue] = useState<any>(null);
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      console.log('onChangeHandler user:' + user);
      setUserValue(user);
    });
    if (userValue == null) {
      return <div>Loading</div>;
    }

    console.log('user at private' + firebase.auth().currentUser);
    var user = userValue as firebase.User;
    return <div>Private PAGE {user.displayName}</div>;
  }
};
