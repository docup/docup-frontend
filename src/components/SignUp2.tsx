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
  Stepper,
  Step,
  StepContent,
  StepLabel,
  TextField,
  Slide,
  MenuItem,
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
    paperConfirm: {
      background: '#F0F0F0',
      margin: '1vw',
      padding: '1vw',
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
  url: 'http://c02c6157md6t.local:3000/signinwithemaillink',
  // This must be true.
  handleCodeInApp: true,
};

const countries = [
  {
    value: '+81',
  },
];

const SignIn3: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailForLink, setEmailForLink] = useState('');
  const [country, setCountry] = React.useState('+81');
  const [activeStep, setActiveStep] = React.useState(0);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [errorTextEmail, setErrorTextEmail] = React.useState('');
  const [errorTextForLink, setErrorTextForLink] = React.useState('');
  const steps = ['入力', '登録の確認'];
  var recaptchaVerifier: firebase.auth.ApplicationVerifier;

  const handleSignUp = () => {
    const re = /^.+@.+$/i;
    const reTel = /^\+819[0-9].+$/i; //携帯電話
    if (re.test(emailForLink)) {
      setErrorTextForLink('');
      firebase
        .auth()
        .sendSignInLinkToEmail(emailForLink, actionCodeSettings)
        .then(function() {
          console.log('The link was successfully sent');
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', emailForLink);
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          console.error(error);
        });
    } else if (reTel.test(emailForLink)) {
      setErrorTextForLink('');

      firebase
        .auth()
        .signInWithPhoneNumber(emailForLink, recaptchaVerifier)
        .then(function(confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult);
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      setErrorTextForLink('入力内容が正しくありません');
    }
  };

  const emailForLinkOnChange = (event: any) => {
    setEmailForLink(event.target.value);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        if (user != null && activeStep == 1) {
          window.location.replace('/');
        }
      });
    return () => unsubscribe();
  });

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root} id="rootDiv">
        <Container maxWidth="sm">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: { optional?: React.ReactNode } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep == 0 && (
            <Slide
              direction="left"
              in={true}
              mountOnEnter
              unmountOnExit
              onExited={() => {
                setSlideIndex(1);
              }}
            >
              <Paper elevation={0}>
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
                  error={errorTextEmail != ''}
                  required
                  className={classes.textField}
                  id="outlined-required"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  helperText={errorTextEmail}
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
                  id="submitButton"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                >
                  新規登録
                </Button>
                <Box m={3} />
                <Divider />
                <Box m={3} />
                <Typography className={classes.typography} color="secondary">
                  または、パスワード不要のリンク認証
                </Typography>
                <TextField
                  error={errorTextForLink != ''}
                  required
                  className={classes.textField}
                  id="outlined-required"
                  label="Emailリンクによる認証"
                  value={emailForLink}
                  variant="outlined"
                  onChange={emailForLinkOnChange}
                  helperText={errorTextForLink}
                />
                <Box m={3} />
                <Button
                  id="submitButton"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                >
                  新規登録
                </Button>
                <Box m={3} />
                <Divider />
                <Box m={3} />
                <Typography className={classes.typography} color="secondary">
                  または、電話番号で登録
                </Typography>
                <Box m={1} />
                <Box display="flex">
                  <Box order={1}>
                    <TextField
                      select
                      label="国"
                      value={country}
                      onChange={e => {
                        setCountry(e.target.value);
                      }}
                      variant="outlined"
                    >
                      {countries.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box order={2} m={1}></Box>
                  <Box flexGrow={1} order={3}>
                    <TextField
                      fullWidth
                      type="tel"
                      label="電話番号"
                      variant="outlined"
                    ></TextField>
                  </Box>
                </Box>
                <Box m={3} />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.href = '/signup-phone';
                  }}
                >
                  新規登録
                </Button>
              </Paper>
            </Slide>
          )}
          {activeStep == 1 && (
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
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
                  に認証リンクを送信しました。リンクをクリックしてサインインを完了してください
                </Typography>
                <Box m={3} />
              </Paper>
            </Slide>
          )}
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default SignIn3;
