import React from 'react';
import { IconButton } from '@material-ui/core/';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import { ListItemIcon } from '@material-ui/core/';
import { ListItemText } from '@material-ui/core/';

const options = ['Your Profile', 'Sign Out'];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
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
          {/* {options.map(option => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={this.handleClose}
            >
              {option}
            </MenuItem> */}
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
          <MenuItem>
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

export default LongMenu;
