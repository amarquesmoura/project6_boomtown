import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { ViewerContext } from '../../context/ViewerProvider';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';

class ItemsContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => (
          <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader inverted />;
              if (error) return <p>{`Error! ${error.message}`}</p>;
              return <Items classes={this.props.classes} items={data.items} />;
            }}
          </Query>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
