import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ classes }) => {
  return (
    <div>
      <p>
        This is the profile page located at <code>/profile/:userId</code>.
      </p>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Profile;
