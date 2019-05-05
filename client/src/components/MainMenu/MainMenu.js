import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React, { Component } from 'react';

import styles from './styles';

class MainMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {({ logout }) => (
          <React.Fragment>
            <IconButton
              aria-owns={anchorEl ? 'fade-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={this.handleClose}
                component={props => (
                  <li {...props}>
                    <Link to="/profile" className={classes.buttonLink}>
                      <ListItemIcon className={classes.icon}>
                        <FingerprintIcon />
                      </ListItemIcon>

                      <ListItemText
                        classes={{ primary: classes.primary }}
                        inset
                        primary="Your Profile"
                      />
                    </Link>
                  </li>
                )}
              />
              <MenuItem onClick={logout.mutation}>
                <ListItemIcon className={classes.icon}>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary="Sign Out"
                />
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MainMenu);
