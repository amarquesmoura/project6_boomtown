import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Items from '../pages/Items';
import Home from '../pages/Home';
import Share from '../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import FullScreenLoader from '../components/FullScreenLoader';
import MenuBar from '../components/MenuBar';
const Profile = ({ match }) => (
  <div>
    <Switch>
      <Route
        path={`${match.url}/0`}
        render={({ match }) => <h2>Current User Profile Page!</h2>}
      />
      <Route
        path={`${match.url}/:userid`}
        render={({ match }) => (
          <h2>Profile Page of User {match.params.userid}!</h2>
        )}
      />
    </Switch>
  </div>
);

export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <FullScreenLoader />;
        if (!viewer) {
          return (
            <Switch>
              <Route exact path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
        return (
          <Fragment>
            <MenuBar />
            <Switch>
              <Route exact path="/items" component={Items} />
              <Route exact path="/share" component={Share} />
              <Route path="/profile" component={Profile} />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      }}
    </ViewerContext.Consumer>
  </Fragment>
);
