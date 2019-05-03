import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemCard from '../ItemCard/ItemCard';
import { Grid } from '@material-ui/core';

const ItemsGrid = ({ classes, items }) => {
  return (
    <div className={classes.layout}>
      <Grid container spacing={24}>
        {items.map((item, i) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <ItemCard item={item} key={item.id} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ItemsGrid);
