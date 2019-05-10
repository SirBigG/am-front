import fetch from 'isomorphic-fetch'
import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography'
import configs from '../configs/configs'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
    cardGrid: {}
});

const Index = ({posts, classes}) => {
  return (
      <Grid container spacing={40} className={classes.cardGrid}>
          {posts.results.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                  <Card className={classes.card}>
                      <Hidden xsDown>
                          <CardMedia
                              className={classes.cardMedia}
                              image={configs.api + post.photo.image}// eslint-disable-line max-len
                              title="Image title"
                          />
                      </Hidden>
                      <div>
                          <CardContent>
                              <Typography component="h2" variant="h5">
                                  {post.title}
                              </Typography>

                          </CardContent>
                      </div>

                  </Card>
              </Grid>
          ))}
      </Grid>
  )
};

Index.getInitialProps = async ({req}) => {
    const res = await fetch(`${configs.api}/api/post/all/`);
    const json = await res.json();
    return {posts: json}
};


export default withStyles(styles)(Index)
