import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import ItemsGrid from '../../components/ItemsGrid';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const Profile = ({ classes, user }) => {
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid className={classes.profile} item xs={12}>
          <div className={classes.container}>
            <div className={classes.header}>
              <Gravatar
                className={classes.gravatar}
                email={user.email + '/d=retro'}
              />
              <Typography
                className={classes.name}
                variant="headline"
                component="h3"
              >
                {user.fullname}
              </Typography>
            </div>
            <Typography variant="headline" component="h3" gutterBottom>
              {user.items.length} Items shared {user.borrowed.length} Items
              borrowed
            </Typography>
            <Typography component="h2" variant="headline" gutterBottom>
              {user.bio === null ? '"No bio provided."' : user.bio}
            </Typography>
          </div>
          <div className={classes.shareitemContainer}>
            <Typography className={classes.shareitem} gutterBottom>
              Shared Items
            </Typography>
            <ItemsGrid items={user.items} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
