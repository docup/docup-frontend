import React from 'react';
import { TextInput } from './TextInput';
import { TopPageHandler } from '../containers/TopPageContainer';
import { RadioInput } from './RadioInput';
import { ShowState } from './ShowState';
import { SubmitButton } from './SubmitButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import axios from 'axios';

function handleCallPublicAPI() {
  axios
    //.get('https://api-dot-docup-269111.appspot.com/guest', {
    .get(process.env.REACT_APP_API_HOST + '/api/v1/guest', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      alert(JSON.stringify(response.data));
    })
    .catch(error => {
      alert(error);
    });
}

export class MyPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Box component="div" m={1}>
          My Page
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCallPublicAPI}
        >
          Call API with Auth
        </Button>

        <Box component="div" m={1}>
          <a href="/">Go to site top</a>
        </Box>
      </React.Fragment>
    );
  }
}
