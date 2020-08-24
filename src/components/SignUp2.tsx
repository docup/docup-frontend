import React, { useState, useEffect } from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {
  Container,
  GridList,
  GridListTile,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Divider,
  Paper,
  TextField,
} from '@material-ui/core';
import { Menu, Favorite, Search } from '@material-ui/icons';
import {
  Theme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import GoogleButton from 'react-google-button';
import { customTheme } from '../theme';
import * as firebase from 'firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
      //background: '#F0F0F0',
    },
    paper: {
      background: '#F0F0F0',
      margin: '3vw',
      padding: '6vw',
    },
    textField: {
      width: '100%',
      background: '#FFF',
    },
    button: {
      width: '100%',
    },
    typography: {
      width: '80%',
      margin: 'auto',
      textAlign: 'center',
    },
    googleSignInButton: {
      margin: 'auto',
    },
  })
);

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

type Props = {
  //onSignIn: (token: any, user: any) => void;
};

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:3000/signinwithemaillink',
  // This must be true.
  handleCodeInApp: true,
};

const SignIn3: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        console.log('The link was successfully sent');
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        console.error(error);
      });
  };

  const emailOnChange = (event: any) => {
    setEmail(event.target.value);
  };

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <Container maxWidth="md">
          <Box m={3} />
          <Typography
            className={classes.typography}
            variant="h4"
            component="h5"
          >
            さあはじめましょう
          </Typography>
          <Box m={3} />
          <TextField
            required
            className={classes.textField}
            id="outlined-required"
            label="Email"
            value={email}
            variant="outlined"
            onChange={emailOnChange}
          />
          <Box m={3} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSignUp}
          >
            新規登録
          </Button>
          <Box m={3} />
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default SignIn3;