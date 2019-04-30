import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsCard from '../ItemsCard/ItemsCard';
import Grid from '@material-ui/core/Grid';

class ItemsGrid extends Component {
  render() {
    return (
      <Grid container>
        {items.map((item, i) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <ItemsCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(ItemsGrid);
