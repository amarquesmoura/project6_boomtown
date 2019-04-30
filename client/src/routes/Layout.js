import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
// import ShareItemForm from '../components/ShareItemForm/ShareItemForm';
// import ShareItemForm from '../components/ShareItemForm/ShareItemForm';
// import Items from '../pages/Items';
// import Home from '../pages/Home';

// import Profile from '../pages/Profile';

import Share from '../pages/Share';
// const Items = () => <h1>Dummy Items Page!</h1>;
// const Welcome = () => <h1>Dummy Welcome Page!</h1>;
// const Share = () => ShareItemForm;
// const Profile = ({ match }) => (
//   <div>
//     <Switch>
//       <Route
//         path={`${match.url}/0`}
//         render={({ match }) => <h2>Current User Profile Page!</h2>}
//       />
//       <Route
//         path={`${match.url}/:userid`}
//         render={({ match }) => (
//           <h2>Profile Page of User {match.params.userid}!</h2>
//         )}
//       />
//     </Switch>
//   </div>
// );

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
      {/* <Route exact path="/items" component={Items} /> */}
      {/* <Route exact path="/welcome" component={Home} /> */}
      <Route exact path="/share" component={Share} />
      {/* <Route path="/profile" component={Profile} /> */}
    </Switch>
  </Fragment>
);
