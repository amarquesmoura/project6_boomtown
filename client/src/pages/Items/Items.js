import React from 'react';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import PropTypes from 'prop-types';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.root}>
      <ItemsGrid items={items} />
    </div>
  );
};

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired
};

export default Items;
