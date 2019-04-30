import React from 'react';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
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
