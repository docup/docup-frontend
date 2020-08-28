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

const Console: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState('one');
  const [openProgress, setOpenProgress] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={consoleTheme}>
      <div className={classes.root}>
        <AppBar
          position="static"
          title="hoge"
          color="transparent"
          elevation={1}
        >
          <Box display="flex" p={1} bgcolor="background.paper">
            <Box order={2} bgcolor="grey.300">
              Item 1
            </Box>
            <Box order={1} bgcolor="grey.300">
              Item 3
            </Box>
            <Box order={4} bgcolor="grey.300" flexGrow={1}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <Box order={5} bgcolor="grey.300">
              Item 2
            </Box>
          </Box>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <Container maxWidth="md">
          <div>aa</div>
        </Container>
      </div>

      <Backdrop className={classes.backdrop} open={openProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MuiThemeProvider>
  );
};

export default Console;
