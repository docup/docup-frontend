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
import useReactRouter from 'use-react-router';
import queryString from 'query-string';

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
  })
);

type Props = {};

const SignInWithEmailLink: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const { history, location, match } = useReactRouter();

  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      const qs = queryString.parse(location.search);
      var email = '';
      if (typeof qs.email == 'string') {
        email = qs.email;
      } else if (qs.email instanceof Array) {
        email = qs.email[0];
      }
      if (email == '') {
        console.error('email not found');
        return;
      }

      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          window.location.replace('/');
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  });

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}></div>
    </MuiThemeProvider>
  );
};

export default SignInWithEmailLink;
