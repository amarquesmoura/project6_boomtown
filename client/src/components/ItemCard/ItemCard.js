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

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={item.imageurl}
        title={item.title}
      />
      <CardHeader
        title={item.itemowner.fullname}
        avatar={
          <Avatar round="true">
            <Gravatar email={item.itemowner.email} />
          </Avatar>
        }
      />
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
  );
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
