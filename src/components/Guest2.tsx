import React from 'react';
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
} from '@material-ui/core';
import { Menu, Favorite, Search } from '@material-ui/icons';
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
      background: '#F3F3F3',
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
  {
    img:
      'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
    cols: 1.5,
    title: 'YUMI',
    description:
      '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  },
  {
    img:
      'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
    cols: 1.5,
    title: 'AKI',
    description:
      '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  },
  {
    img:
      'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
    cols: 3,
    title: 'MINA',
    description:
      '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  },
  {
    img:
      'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
    cols: 1,
    title: 'YUMI',
    description:
      '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  },
  {
    img:
      'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
    cols: 1,
    title: 'AKI',
    description:
      '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  },
  {
    img:
      'https://manimani-korea.net/wp-content/uploads/2016/07/DD7FC820-1969-47CE-9F9D-A2C701DEDA3F.jpeg',
    cols: 1,
    title: 'YUMI',
    description:
      '清楚な佇まいで見るからに優しさがにじみ出ている美人さん。見た目通りの優しい笑顔と穏やかな性格で、癒し度120％。その存在が、貴方の心と身体を優しく包み込んでくれることでしょう',
  },
];

const Guest2: React.FC<Props> = ({ text }) => {
  const classes = useStyles();
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
            >
              <Menu />
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
            <Button color="inherit">Login</Button>
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
                        defaultValue={2}
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
    </MuiThemeProvider>
  );
};

export default Guest2;
