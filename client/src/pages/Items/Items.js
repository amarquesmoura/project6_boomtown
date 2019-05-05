import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import ItemsContainer from './ItemsContainer';
import FullScreenLoader from '../../components/FullScreenLoader';
import styles from './styles';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.root}>
      <ItemsGrid items={items} />
    </div>
  );
};

export default Items;
