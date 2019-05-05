import React from 'react';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const Share = ({ tags, classes }) => {
  return (
    <div>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        spacing={24}
      >
        <Grid className={classes.gridItem} item xs={12} sm={6}>
          <Grid container justify="center" spacing={Number(16)}>
            <ShareItemPreview tags={tags} />
          </Grid>
          <Grid className={classes.gridItem} item xs={4}>
            <ShareItemForm tags={tags} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Share);
