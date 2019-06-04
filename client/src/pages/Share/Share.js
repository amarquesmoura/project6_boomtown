import React from 'react';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const Share = ({ tags, classes }) => {
  return (
    <div className={classes.shareContainer}>
      <div className={classes.itemPreview}>
        <ShareItemPreview tags={tags} />
      </div>
      <div className={classes.shareForm}>
        <ShareItemForm tags={tags} />
      </div>
    </div>
  );
};

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired
};

export default withStyles(styles)(Share);
