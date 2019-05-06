import React from 'react';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import { withStyles } from '@material-ui/core';

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

export default withStyles(styles)(Share);
