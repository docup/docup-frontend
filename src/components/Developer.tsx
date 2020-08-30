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
  Dialog,
  DialogActions,
  InputBase,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Backdrop,
  CircularProgress,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Favorite, Search } from '@material-ui/icons';
import {
  Theme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { consoleTheme } from '../themeConsole';
import SignIn3 from './SignIn3';
import * as firebase from 'firebase';
import { FirebaseAuth } from './FirebaseAuth';
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
      //background: '#333333',
    },
    appbar: {},
    appnavi: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    tab: {
      minWidth: '6vw',
      maxWidth: '12vw',
    },
    paperContainer: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg01.png)`,
      backgroundSize: 'contain',
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

type Props = {};

console.error('datadog error test');

const Developer: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const { history, location, match } = useReactRouter();

  const [value, setValue] = React.useState(0);
  const [openProgress, setOpenProgress] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    history.push('/developer/' + newValue);
  };

  useEffect(() => {
    [
      { p: '/developer/0', v: 0 },
      { p: '/developer/1', v: 1 },
      { p: '/developer/2', v: 2 },
      { p: '/developer/3', v: 3 },
      { p: '/developer/4', v: 4 },
    ].map(({ p, v }) => {
      if (history.location.pathname == p) {
        setValue(v);
      }
    });
  });

  return (
    <MuiThemeProvider theme={consoleTheme}>
      <div className={classes.root}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Container maxWidth="md">
            <Box display="flex" bgcolor="background.paper">
              <Box order={1} m={1}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/personal-developer.png`}
                />
              </Box>
              <Box order={2} flexGrow={1} alignSelf="center">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className={classes.appnavi}
                >
                  <Tab className={classes.tab} label="概要" {...a11yProps(0)} />
                  <Tab
                    className={classes.tab}
                    label="プランと機能"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={classes.tab}
                    label="デベロッパー"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={classes.tab}
                    label="よくある質問"
                    {...a11yProps(2)}
                  />
                  <Tab
                    className={classes.tab}
                    label="お問い合わせ"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <Box order={3} alignSelf="center">
                <Button color="primary">サインイン</Button>
              </Box>
            </Box>
          </Container>
          <Divider />
        </AppBar>
        <TabPanel value={value} index={0}>
          <Container maxWidth="md">
            <Box p={10}>
              <Typography align="center" variant="h3">
                概要
              </Typography>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>

      <Backdrop className={classes.backdrop} open={openProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MuiThemeProvider>
  );
};

export default Developer;
