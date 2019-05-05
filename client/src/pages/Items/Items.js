import React from 'react';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.root}>
      <ItemsGrid items={items} />
    </div>
  );
};

export default Items;
