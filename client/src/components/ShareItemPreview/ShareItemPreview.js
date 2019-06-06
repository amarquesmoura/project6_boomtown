import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard';
import styles from './styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ShareItemPreview = ({ classes, shareItemPreview }) => {
  return <ItemCard className={classes.itemCard} item={shareItemPreview} />;
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

ShareItemPreview.propTypes = {
  shareItemPreview: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview));
