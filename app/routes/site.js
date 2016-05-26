import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';
import {Map} from 'immutable';
import createLocation from 'history/lib/createLocation';
import {makeStore} from '../scripts/store';
import {loadAsyncNeeds} from '../scripts/isomorphic';
import {routes} from '../scripts/routes';
import pageTitle from '../scripts/pageTitle';

const router = express.Router();

router.get('*', function(req, res, next) {

  function renderError(status, message) {
    res.status(status);
    res.render('error', {
      message: message,
      error: {}
    });
  }

  function renderSuccess(markup, initialState) {
    res.render('home', {
      markup: markup,
      initialState: encodeURI(JSON.stringify(initialState)),
      title: initialState.title || pageTitle.getDefault()
    });
  }

  function getMarkupAsString(renderProps, store) {
    let initialElement = (
      <RoutingContext {...renderProps} />
    );
    return ReactDOMServer.renderToString(
      <Provider store={store}>
        {initialElement}
      </Provider>
    );
  }

  let location = Object.assign({}, createLocation(req.originalUrl), {params:req.params, query:req.query});
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      renderError(500, error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let store = makeStore();
      pageTitle.init(store);
      loadAsyncNeeds(store.dispatch, renderProps.components, renderProps.params, renderProps.location.query)
        .then(() => getMarkupAsString(renderProps, store))
        .then(markup => renderSuccess(markup, store.getState().toJS()))
        .catch(err => renderError(500, err.message));
    } else {
      renderError(404, 'Not Found');
    }
  });

});

export {router as default};