import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Typography
} from '@material-ui/core';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ViewerContext } from '../../context/ViewerProvider';

const ItemCard = ({ classes, item }) => {
  const userProfile = `/profile/${item.itemowner.id}`;
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => (
        <Card className={classes.card}>
          <Link to={userProfile}>
            <CardMedia
              className={classes.media}
              image={item.imageurl}
              title={item.title}
            />
            <CardHeader
              title={item.itemowner.fullname || viewer.fullname}
              avatar={
                <Avatar round="true">
                  <Gravatar email={item.itemowner.email || viewer.email} />
                </Avatar>
              }
            />
          </Link>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {item.title}
            </Typography>
            <Typography className={classes.tags} gutterBottom>
              {item.tags && item.tags.map(t => t.title).join(', ')}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" className={classes.button}>
              Borrow
            </Button>
          </CardActions>
        </Card>
      )}
    </ViewerContext.Consumer>
  );
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
