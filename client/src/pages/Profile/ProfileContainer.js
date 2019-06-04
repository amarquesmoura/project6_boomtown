import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ProfileContainer extends Component {
  render() {
    return <Profile />;
  }
}

export default withStyles(styles)(ProfileContainer);
