import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import store from '../common/stores';
import Routes from '../common/routes';

import '../../assets/styles/Helper.scss';
import '../../assets/styles/index.scss';

const preloadState = window.preloadState || {};
const Store = store(browserHistory, preloadState);

ReactDOM.render(
  <Provider store={Store} key="provider">
    {Routes(Store, browserHistory)}
  </Provider>
, document.getElementById('root'));
