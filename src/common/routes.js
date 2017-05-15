import React from 'react';
import { Router, IndexRoute } from 'react-router';
import { Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { CommentList } from './containers';

const Routes = (store, history) => (
  <Router history={syncHistoryWithStore(history, store)}>
    <Route path="/">
      <IndexRoute component={CommentList} />
      <Route path="comments" component={CommentList} />
    </Route>
  </Router>
);

export default Routes;
