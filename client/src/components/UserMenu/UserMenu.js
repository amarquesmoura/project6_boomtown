import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import styles from './styles';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;

class UserMenu extends React.Component {
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
    const open = Boolean(anchorEl);
    const { logoutMutation } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem
            component={props => (
              <li {...props}>
                <Link to="/profile">
                  <ListItemIcon>
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Your Profile" />
                </Link>
              </li>
            )}
          />
          <MenuItem onClick={logoutMutation}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sign Out" />
          </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  logoutMutation: PropTypes.func.isRequired
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),
  withStyles(styles)
)(UserMenu);
