import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemsCard from '../ItemsCard';
import styles from './styles';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    <div>
      <ItemsCard item={shareItemPreview} />
    </div>
  );
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview));
