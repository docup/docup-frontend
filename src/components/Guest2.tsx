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
import { customTheme } from '../theme';
import SignIn3 from './SignIn3';
import * as firebase from 'firebase';
import { FirebaseAuth } from './FirebaseAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
      background: '#333333',
    },
    appbar: {
      marginBottom: '30px',
    },
    search: {
      flexGrow: 1,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    gridList: {
      //maxHeight: '100px',
    },
    card: {
      height: '99%',
    },
    cardActionArea: {
      height: '100%',
    },
    loginDialog: {
      maxWidth: 'xl',
    },
    swipeableDrawer: {},
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
  text: string;
};

const tileData = [
  // {
  //   img:
  //     'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
  //   cols: 1.5,
  //   title: 'YUMI',
  //   rating: 5,
  //   description:
  //     '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  // },
  // {
  //   img:
  //     'https://www.goabroadfromjapan.com/wp-content/uploads/2018/07/Screen-Shot-2018-07-15-at-18.35.02.png',
  //   cols: 1.5,
  //   title: 'AKI',
  //   rating: 5,
  //   description:
  //     '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  // },
  // {
  //   img: 'https://www.instagram.com/p/BP2V0IpAT2s/media?size=l',
  //   cols: 3,
  //   title: 'MINA',
  //   rating: 5,
  //   description:
  //     '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  // },
  // {
  //   img: 'https://www.instagram.com/p/Bjj2IgAnNiB/media/?size=l',
  //   cols: 1,
  //   title: 'RIN',
  //   rating: 4,
  //   description:
  //     '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  // },
  // {
  //   img:
  //     'https://i.pinimg.com/originals/1a/9c/f1/1a9cf108c039d28980fe5dbdaa5575ab.png',
  //   cols: 1,
  //   title: 'MOMOE',
  //   rating: 4,
  //   description:
  //     '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  // },
  // {
  //   img:
  //     'https://image.space.rakuten.co.jp/d/strg/ctrl/9/0ca96f5b6b8dcdf79ca231ca719e7731d98fcc1a.42.2.9.2.jpeg',
  //   cols: 1,
  //   title: 'RIKU',
  //   rating: 4,
  //   description:
  //     '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  // },
  {
    img: 'https://icon-note.com/wp-content/uploads/2020/02/icon_human_036.png',
    cols: 3,
    title: 'RIKU',
    rating: 4,
    description: 'descdescdescdescdescdescdescdescdesc',
  },
  {
    img: 'https://icon-note.com/wp-content/uploads/2020/02/icon_human_036.png',
    cols: 1,
    title: 'RIKU',
    rating: 4,
    description: 'descdescdescdescdescdescdescdescdesc',
  },
  {
    img: 'https://icon-note.com/wp-content/uploads/2020/02/icon_human_036.png',
    cols: 1,
    title: 'RIKU',
    rating: 4,
    description: 'descdescdescdescdescdescdescdescdesc',
  },
  {
    img: 'https://icon-note.com/wp-content/uploads/2020/02/icon_human_036.png',
    cols: 1,
    title: 'RIKU',
    rating: 4,
    description: 'descdescdescdescdescdescdescdescdesc',
  },
];

const Guest2: React.FC<Props> = ({ text }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [openLeftSideMenu, setOpenLeftSideMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(
    firebase.auth().currentUser
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setCurrentUser(firebase.auth().currentUser);
      });
  };

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setOpenLeftSideMenu(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              Yasuraoka.com
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {currentUser == null ? (
              <Button
                color="inherit"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Login
              </Button>
            ) : (
              <Button onClick={handleOpenMenu}>
                <Avatar
                  alt="K.Yasuraoka"
                  src={`${process.env.PUBLIC_URL}/images/2.jpg`}
                />
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <GridList cellHeight={400} className={classes.gridList} cols={3}>
            {tileData.map(tile => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <Card className={classes.card}>
                  <CardActionArea className={classes.cardActionArea}>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="60%"
                      image={tile.img}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {tile.title}
                      </Typography>
                      <StyledRating
                        name="customized-color"
                        defaultValue={tile.rating}
                        getLabelText={(value: number) =>
                          `${value} Heart${value !== 1 ? 's' : ''}`
                        }
                        precision={0.5}
                        icon={<Favorite fontSize="inherit" />}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {tile.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions> */}
                </Card>

                {/* <img src={tile.img} alt={tile.title} /> */}
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </div>
      <Dialog
        className={classes.loginDialog}
        fullWidth={true}
        maxWidth="xl"
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        scroll="body"
      >
        <SignIn3 />
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          プロフィール
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          マイアカウント
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut();
          }}
        >
          ログアウト
        </MenuItem>
      </Menu>
      <SwipeableDrawer
        className={classes.swipeableDrawer}
        anchor="left"
        open={openLeftSideMenu}
        onClose={() => {
          setOpenLeftSideMenu(false);
        }}
        onOpen={() => {
          setOpenLeftSideMenu(true);
        }}
      >
        <List>
          {['トップ', '履歴', '予約', 'お支払い', 'お問い合わせ'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {['設定'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </MuiThemeProvider>
  );
};

export default Guest2;
