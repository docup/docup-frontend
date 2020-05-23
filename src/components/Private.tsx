import React from 'react';
import * as firebase from 'firebase';

export class Private extends React.Component {
  render() {
    console.log('user at private' + firebase.auth().currentUser);
    return <div>Private PAGE</div>;
  }
}
