import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const FullScreenLoader = ({ classes, inverted }) => {
  const color = !inverted ? 'secondary' : 'primary';
  return (
    <Fade in>
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <CircularProgress
          className={classes.progress}
          size={50}
          color={color}
        />
        <Typography variant="title" color={color}>
          “For it is in giving that we receive.”
        </Typography>
      </Grid>
    </Fade>
  );
};

export default withStyles(styles)(FullScreenLoader);
