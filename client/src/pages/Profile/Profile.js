import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import ItemsGrid from '../../components/ItemsGrid';

const Profile = ({ viewer }) => {
  return (
    <Paper elevation={4}>
      <div>
        <Gravatar email={viewer.email + '/d=retro'} />
        <Typography variant="headline" component="h3">
          {viewer.fullname}
        </Typography>
      </div>
      <Typography component="p">
        0 Items shared 0 Items borrowed
        <br />
        {viewer.bio ? viewer.bio : '"No bio provided."'}
      </Typography>
      <div>
        {viewer.items.length !== 0 ? (
          <Typography variant="h4">Shared Items</Typography>
        ) : null}
        <ItemsGrid items={viewer.items} />
      </div>
    </Paper>
  );
};

Profile.propTypes = {
  viewer: PropTypes.object.isRequired
};

export default Profile;
