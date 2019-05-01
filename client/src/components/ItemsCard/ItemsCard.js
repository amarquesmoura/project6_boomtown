import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

class ItemsCard extends Component {
  render() {
    const { item, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          title={item.title}
        />
        <CardHeader
          className={classes.itemCardGravatarImage}
          title={item.itemowner.fullname}
          avatar={<Gravatar email={item.itemowner.email} />}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {item.tags && item.tags.map(t => t.title).join(', ')}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            {item.description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ItemsCard);
