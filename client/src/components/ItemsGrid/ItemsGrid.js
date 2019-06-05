import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemCard from '../ItemCard/ItemCard';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const ItemsGrid = ({ classes, items }) => {
  return (
    <div>
      <Grid container spacing={24}>
        {items.map((item, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <ItemCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(ItemsGrid);
