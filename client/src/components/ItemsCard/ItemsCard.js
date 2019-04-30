import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Gravatar from 'react-gravatar';

class ItemsCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <Card>
        <CardMedia image={item.imageurl} title={item.title} />
        <CardHeader
          title={item.itemowner.fullname}
          avatar={<Gravatar email={item.itemowner.email} />}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {/* {item.tags} */}
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
