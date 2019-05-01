import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {ItemsCard} from '../ItemsCard';
import {Grid} from '@material-ui/core';
import {Grow} from '@material-ui/core';

class ItemsGrid extends Component {
  render() {
    const { items } = this.props;
    return (
      <Grid container spacing={24}>
        {items.map((item, i) => {
          return (
            <Grow
              in={!!item}
              key={item.id}
              style={{ transitionDelay: `${i * 0.03}s` }}
            ></Grow>
            <Grid item xs={12} md={6} lg={4}>
              <ItemsCard item={item} />
            </Grid>
            </Grow>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(ItemsGrid);
