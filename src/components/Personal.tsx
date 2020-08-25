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
  MenuItem,
  Slide,
} from '@material-ui/core';
import { Menu, Favorite, Search } from '@material-ui/icons';
import useReactRouter from 'use-react-router';
import {
  Theme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { customTheme } from '../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
      //background: '#F0F0F0',

      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      marginTop: '1em',
      marginBottom: '1em',
      padding: '1em',
    },
    typo: {
      color: '#666',
    },
    tf: {
      width: '25%',
    },
    tf2: {
      width: '75%',
    },
    tf3: {
      width: '90%',
    },
    button: {
      width: '100%',
    },
  })
);

type Props = {};

const countries = [
  {
    value: '+81',
  },
];

const prefectures = [
  {
    value: '東京都',
  },
];

const Personal: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const { history, location, match } = useReactRouter();
  const [country, setCountry] = React.useState('+81');
  const [prefecture, setPrefecture] = React.useState('東京都');

  const handleSubmit = () => {};

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root} id="rootDiv">
        <Container maxWidth="sm">
          <Paper elevation={2} className={classes.paper}>
            <Typography variant="h6" className={classes.typo}>
              氏名
            </Typography>
            <Divider />
            <Box m={3} />
            <Box>
              <TextField label="性" variant="outlined"></TextField>
              <TextField label="名" variant="outlined"></TextField>
            </Box>
            <Box>
              <TextField label="性（フリガナ）" variant="outlined"></TextField>
              <TextField label="名（フリガナ）" variant="outlined"></TextField>
            </Box>
          </Paper>
          <Paper elevation={2} className={classes.paper}>
            <Typography variant="h6" className={classes.typo}>
              生年月日
            </Typography>
            <Divider />
            <Box m={3} />
            <Box>
              <TextField
                className={classes.tf}
                type="number"
                label="年"
                variant="outlined"
              ></TextField>
              <TextField
                className={classes.tf}
                type="number"
                label="月"
                variant="outlined"
              ></TextField>
              <TextField
                className={classes.tf}
                type="number"
                label="日"
                variant="outlined"
              ></TextField>
            </Box>
          </Paper>
          <Paper elevation={2} className={classes.paper}>
            <Typography variant="h6" className={classes.typo}>
              電話番号
            </Typography>
            <Divider />
            <Box m={3} />
            <Box>
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
              <TextField
                className={classes.tf2}
                type="tel"
                label="電話番号"
                variant="outlined"
              ></TextField>
            </Box>
          </Paper>
          <Paper elevation={2} className={classes.paper}>
            <Typography variant="h6" className={classes.typo}>
              住所
            </Typography>
            <Divider />
            <Box m={3} />
            <Box>
              <TextField
                className={classes.tf}
                type="number"
                label="郵便番号"
                variant="outlined"
                helperText="ハイフン不要"
              ></TextField>
              <TextField
                select
                label="都道府県"
                value={prefecture}
                onChange={e => {
                  setPrefecture(e.target.value);
                }}
                variant="outlined"
              >
                {prefectures.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={classes.tf3}
                label="住所1"
                variant="outlined"
              ></TextField>
              <TextField
                className={classes.tf3}
                label="住所2"
                variant="outlined"
              ></TextField>
            </Box>
          </Paper>
          <Box m={3} />
          <Button
            id="submitButton"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            新規登録
          </Button>
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default Personal;
