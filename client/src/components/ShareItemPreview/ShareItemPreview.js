import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard';
import styles from './styles';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview));
