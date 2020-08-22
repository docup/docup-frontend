import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import { Menu, Favorite } from '@material-ui/icons';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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
          <Typography variant="h6" className={classes.title}>
            Yasuraoka.com
          </Typography>
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
  );
};

export default Guest2;
