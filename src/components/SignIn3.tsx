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

const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const SignIn3: React.FC<Props> = ({}) => {
  const classes = useStyles();

  // const useDidMount = (func: Function) =>
  //   useEffect(() => {
  //     func();
  //   }, []);

  // useDidMount(() => {
  //   var p: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
  //   p.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // });

  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithRedirect(authProvider)
      .then(function(result: any) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        //onSignIn(token, user);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <Container maxWidth="md">
          <Paper elevation={1} className={classes.paper}>
            <TextField
              required
              className={classes.textField}
              id="outlined-required"
              label="Email"
              defaultValue=""
              variant="outlined"
            />
            <Box m={3} />
            <TextField
              required
              type="password"
              className={classes.textField}
              id="outlined-required"
              label="Password"
              defaultValue=""
              variant="outlined"
            />
            <Box m={3} />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              ログイン
            </Button>
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <GoogleButton
              className={classes.googleSignInButton}
              onClick={() => {
                handleGoogleLogin();
              }}
            />
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <Typography className={classes.typography}>
              はじめての方はこちら
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              color="default"
            >
              新規登録
            </Button>
          </Paper>
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default SignIn3;
