import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Require App Modules
import Wrapper from './layouts/wrapper';
import Home from './components/home';
import Products from './components/products/component';
import FiltersList from './components/filtersList/component';
import SortList from './components/sortList';

class App extends React.Component {
  render() {
    return (
      <Wrapper main={this.props.main} nav={this.props.nav} sidebar={this.props.sidebar} />
    );
  }
}

export let routes = (
  <Route component={App} path="/">
    <IndexRoute components={{main:Home, nav:FiltersList}} />
    <Route components={{main:Products, nav:FiltersList, sidebar:SortList}} path="products(/:categoryId)"/>
  </Route>
);