import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import UserMenu from '../UserMenu/UserMenu';
import styles from './styles';

import logo from '../../images/boomtown.svg';

class MenuBar extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            className={classes.logoButton}
            color="inherit"
            aria-label="Menu"
          >
            <Link to="/items">
              <img src={logo} alt="Boomtown Logo" className={classes.logo} />
            </Link>
          </IconButton>
          <div className={classes.flex}>
            <Button
              size="small"
              className={classes.button}
              onClick={() => {
                history.push('/share');
              }}
            >
              <AddCircleIcon className={classes.shareicon} />
              Share Something
            </Button>
            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MenuBar));
