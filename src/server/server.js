const express = require('express');
const path = require('path');
const compression = require('compression');
const createMemoryHistory = require('react-router/lib/createMemoryHistory');
const configureStore = require('../common/stores').default;
const { syncHistoryWithStore } = require('react-router-redux');
const { RouterContext, match } = require('react-router');
const routes = require('../common/routes').default;
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
const { Provider } = require('react-redux');
const React = require('react');
const prefetchData = require('./prefetchData').default;

const app = express();
app.use(compression());

const bundlePath = path.join(__dirname, '../..', '/dist');
app.use('/dist', express.static(bundlePath));

const renderHTML = (renderedComponent, preloadState) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://bootswatch.com/flatly/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="/dist/styles.css" />
    </head>
    <body>
      <div id="root">${renderedComponent}</div>
    </body>
    <script>window.preloadState = ${JSON.stringify(preloadState)}</script>
    <script src="/dist/bundle.js"></script>
  </html>
`);

app.get('*', (req, res) => {
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({
    location: req.originalUrl,
    routes: routes(store, history),
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {
      const { components } = renderProps;
      prefetchData(store.dispatch, components, renderProps)
      .then(() => {
        const renderedComponent = renderToStaticMarkup(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>,
        );
        res.status(200).send(renderHTML(renderedComponent, store.getState()));
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

module.exports = app;
