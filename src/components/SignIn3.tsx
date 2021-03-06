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
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
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
    paperConfirm: {
      background: '#F0F0F0',
      margin: '1vw',
      padding: '1vw',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
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
  onSignIn?: (user: firebase.User) => void;
};

const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const SignIn3: React.FC<Props> = props => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [emailForLink, setEmailForLink] = useState('');
  const [password, setPassword] = useState('');
  const [openAuthLinkContainer, setOpenAuthLinkContainer] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [alertDialogText, setAlertDialogText] = useState('');
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { history, location, match } = useReactRouter();

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

  const handleEmailSignIn = () => {
    setOpenProgress(true);

    const actionCodeSettings = {
      // URL must be whitelisted in the Firebase Console.
      url:
        'http://c02c6157md6t.local:3000/signinwithemaillink?email=' +
        encodeURIComponent(emailForLink),
      // This must be true.
      handleCodeInApp: true,
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(emailForLink, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', emailForLink);
        setOpenAuthLinkContainer(true);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        console.error(error);
      })
      .finally(() => {
        setOpenProgress(false);
      });
  };

  const handlePasswordSignIn = () => {
    setOpenProgress(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // switch (error.code) {
        //   case 'auth/too-many-requests': {
        //   }
        // }
        // console.log(error.code);
        // console.error(error);
        setAlertDialogText(JSON.stringify(error));
        setOpenAlertDialog(true);
      })
      .finally(() => {
        setOpenProgress(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        if (props.onSignIn && user) {
          props.onSignIn(user);
        }
      });
    return () => unsubscribe();
  }, []);

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}>
        {openAuthLinkContainer && (
          <Paper elevation={2} className={classes.paperConfirm}>
            <Box m={3} />
            <Typography
              className={classes.typography}
              variant="h5"
              component="h6"
            >
              認証リンクを送信しました
            </Typography>
            <Box m={3} />
            <Typography className={classes.typography}>
              {emailForLink}
              に認証リンクを送信しました。リンクをクリックしてサインインを完了してください。
            </Typography>
            <Box m={3} />
          </Paper>
        )}
        {!openAuthLinkContainer && (
          <Container maxWidth="sm">
            <Box m={3} />
            <TextField
              required
              className={classes.textField}
              id="inputEmail"
              label="Email"
              variant="outlined"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <Box m={3} />
            <TextField
              required
              type="password"
              className={classes.textField}
              id="inputPassword"
              label="Password"
              variant="outlined"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <Box m={3} />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handlePasswordSignIn}
            >
              サインイン
            </Button>
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <TextField
              required
              className={classes.textField}
              id="inputEmail"
              label="Email"
              variant="outlined"
              value={emailForLink}
              onChange={e => {
                setEmailForLink(e.target.value);
              }}
            />
            <Box m={3} />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleEmailSignIn}
            >
              Emailでサインイン
            </Button>
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <TextField
              required
              className={classes.textField}
              id="inputPhoneNumber"
              label="電話番号"
              variant="outlined"
            />
            <Box m={3} />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              電話番号でサインイン
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
              onClick={() => {
                window.location.href = '/signup';
              }}
            >
              新規登録
            </Button>
            <Box m={3} />
          </Container>
        )}
      </div>
      <Dialog
        open={openAlertDialog}
        onClose={() => {
          setOpenAlertDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ERROR</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertDialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAlertDialog(false);
            }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={openProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MuiThemeProvider>
  );
};

export default SignIn3;
