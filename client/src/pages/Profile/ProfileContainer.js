import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import styles from './styles';
import { ViewerContext } from '../../context/ViewerProvider';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import FullScreenLoader from '../../components/FullScreenLoader';

class ProfileContainer extends Component {
  render() {
    const { userIdFromUrl } = this.props;
    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          return (
            <Query
              query={ALL_USER_ITEMS_QUERY}
              variables={{ id: userIdFromUrl ? userIdFromUrl : viewer.id }}
              fetchPolicy="network-only"
            >
              {({ loading, error, data }) => {
                if (loading) return <FullScreenLoader />;
                if (error) return <p>{`Error! ${error.message}`}</p>;
                return <Profile user={data.user} />;
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
