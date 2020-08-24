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
    textFieldConfirmCode: {
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
  url: 'http://localhost:3000/signinwithemaillink',
  // This must be true.
  handleCodeInApp: true,
};

const SignUpPhoneNumber: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const [tel, setTel] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [errorText, setErrorText] = React.useState('');
  const [
    recaptchaVerifier,
    setRecaptchaVerifier,
  ] = React.useState<firebase.auth.RecaptchaVerifier | null>(null);
  const [
    confirmationResult,
    setConfirmationResult,
  ] = useState<firebase.auth.ConfirmationResult | null>(null);
  const steps = ['電話番号を入力してください', '確認コードを入力してください'];

  const handleSignUp = () => {
    const reTel = /^\+819[0-9].+$/i; //携帯電話
    if (reTel.test(tel) && recaptchaVerifier) {
      setErrorText('');
      firebase
        .auth()
        .signInWithPhoneNumber(tel, recaptchaVerifier)
        .then(function(result) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          setConfirmationResult(result);
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      setErrorText('入力内容が正しくありません');
    }
  };

  const telOnChange = (event: any) => {
    setTel(event.target.value);
  };

  const handleConfirmation = () => {
    if (confirmationResult == null) {
      console.error('confirmationResult is null');
      return;
    }
    confirmationResult
      .confirm(confirmationCode)
      .then(function(result) {
        // User signed in successfully.
        var user = result.user;
        window.location.replace('/');
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const useDidMount = (func: Function) =>
    useEffect(() => {
      return func();
    }, []);

  useDidMount(() => {
    const verifier = new firebase.auth.RecaptchaVerifier('submitButton', {
      size: 'invisible',
      callback: function(response: any) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
    setRecaptchaVerifier(verifier);
    verifier.render().then(function(widgetId: any) {});
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
                  error={errorText != ''}
                  required
                  className={classes.textField}
                  type="tel"
                  id="tel"
                  label="電話番号"
                  value={tel}
                  variant="outlined"
                  onChange={telOnChange}
                  helperText={errorText}
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
              </Paper>
            </Slide>
          )}
          {activeStep == 1 && (
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Paper elevation={0}>
                <Paper elevation={2} className={classes.paperConfirm}>
                  <Box m={3} />
                  <Typography
                    className={classes.typography}
                    variant="h5"
                    component="h6"
                  >
                    確認コードを入力してください
                  </Typography>
                  <Box
                    m={3}
                    maxWidth="200px"
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  >
                    <TextField
                      error={errorText != ''}
                      required
                      className={classes.textFieldConfirmCode}
                      type="number"
                      id="confirmation-code"
                      label="6桁の確認コード"
                      value={confirmationCode}
                      variant="outlined"
                      onChange={event => {
                        setConfirmationCode(event.target.value);
                      }}
                    />
                  </Box>
                  <Typography className={classes.typography}>
                    電話番号に送信されたSMSに記載されている確認コードを確認してください
                  </Typography>
                  <Box m={3} />
                </Paper>
                <Box m={3} />
                <Button
                  id="confirmationButton"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmation}
                >
                  認証
                </Button>
                <Box m={3} />
              </Paper>
            </Slide>
          )}
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default SignUpPhoneNumber;
