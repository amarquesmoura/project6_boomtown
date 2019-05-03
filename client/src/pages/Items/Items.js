import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import ItemsContainer from './ItemsContainer';
import FullScreenLoader from '../../components/FullScreenLoader';
import styles from './styles';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.root}>
      <ItemsContainer>
        {({ itemsData: { items, loading } }) => {
          return loading ? (
            <FullScreenLoader inverted />
          ) : (
            <ItemsGrid items={items} />
          );
        }}
      </ItemsContainer>
    </div>
  );
};

export default Items;
