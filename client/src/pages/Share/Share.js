import React from 'react';
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
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
        spacing={16}
      >
        <Grid className={classes.gridItem} item xs={4}>
          <Grid container justify="center" spacing={Number(16)}>
            <ShareItemPreview tags={tags} />
            <ShareItemForm tags={tags} />
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
