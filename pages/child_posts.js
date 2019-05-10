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
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonLink from "../components/ButtonLink";

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

const ChildPosts = ({posts, classes, categories, parent_slug, slug}) => {
  return (
      <div>
      <CssBaseline/>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>

                {categories.map(category => (

                    <Button key={category.slug} component={ButtonLink} href={"/child_posts?parent_slug=" + parent_slug + "&slug=" + slug} hrefAs={"/" + parent_slug + "/" + slug + "/"}>{category.value}</Button>))}
            </Toolbar>
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
          </div>
  )
};

ChildPosts.getInitialProps = async ({req, query}) => {
    let url = `${configs.api}/api/post/all/`;
    if (query.slug) {
        url = `${url}?slug=${query.slug}`
    }

    const res = await fetch(url);
    const json = await res.json();

    let categories_url = `${configs.api}/api/categories/`;
    if (query.slug) {
        categories_url = `${categories_url}?slug=${query.parent_slug}`
    }
    const resCat = await fetch(categories_url);
    const jsonCat = await resCat.json();
    return {posts: json, categories: jsonCat, parent_slug: query.parent_slug, slug: query.slug}
};


export default withStyles(styles)(ChildPosts)
