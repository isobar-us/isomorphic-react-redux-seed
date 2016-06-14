import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {Products} from '../../app/scripts/components/products/component';
import productsReducer from '../../app/scripts/components/products/reducer';
import {loadProducts} from '../../app/scripts/components/products/actions';
import pageTitle from '../../app/scripts/pageTitle';
import {Map} from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

describe('products-component', () => {

  beforeEach(function() {
    this.props = {
      categoryId: '',
      products: [
        {"name":"Bedtime Math","price":10.79,"image":"bedtime.jpg","id":17,"categories":[2]},
        {"name":"Cowpoke Clyde and Dirty Dawg","price":13.05,"image":"cowpoke.jpg","id":8,"categories":[1]}],
      sort: ''
    };
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Products {...this.props} />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('ul');
    expect(this.output.props.children.length).to.equal(this.props.products.length);
  });

});

describe('products-reducer', () => {

  it('reducer LOAD_PRODUCTS_REQUEST returns expected state', function () {
    let state = productsReducer.fn(undefined, {type:'LOAD_PRODUCTS_REQUEST', categoryId:1, sort:'pricedesc'});
    state = state.toJS();
    expect(state.products.items.length).to.equal(0);
    expect(state.products.categoryId).to.equal(1);
    expect(state.products.sort).to.equal('pricedesc');
    expect(state.products.loading).to.be.true;
  });

  it('reducer LOAD_PRODUCTS_SUCCESS returns expected state', function () {
    let state = productsReducer.fn(Map({products:Map()}), {type:'LOAD_PRODUCTS_SUCCESS', items:[{},{}]});
    state = state.toJS();
    expect(state.products.items.length).to.equal(2);
    expect(state.products.loading).to.be.false;
  });

  it('reducer LOAD_PRODUCTS_ERROR returns expected state', function () {
    let state = productsReducer.fn(undefined, {type:'LOAD_PRODUCTS_ERROR'});
    state = state.toJS();
    expect(state.products.items.length).to.equal(0);
    expect(state.products.loading).to.be.false;
  });

});

describe('products-actions', () => {

  const data = [{"name":"Bedtime Math","price":10.79,"image":"bedtime.jpg","id":17,"categories":[2]},
      {"name":"Cowpoke Clyde and Dirty Dawg","price":13.05,"image":"cowpoke.jpg","id":8,"categories":[1]}],
    mockStore = configureMockStore([ thunk ]);

  afterEach(() => {
    nock.cleanAll()
  });

  it('calls LOAD_PRODUCTS_SUCCESS when products request succeeds', () => {
    const store = mockStore({ items: [] });
    const expectedActions = [
      { type: 'DOC_TITLE_CHANGE', title:'Express App - Products' },
      { type: 'LOAD_PRODUCTS_REQUEST', categoryId:'', sort:''},
      { type: 'LOAD_PRODUCTS_SUCCESS', items:data }
    ];
    nock('http://localhost:3000')
      .get('/api/products/')
      .reply(200, data);

    // make sure pageTitle has a store for call from loadProducts
    pageTitle.init(store);

    return store.dispatch(loadProducts({categoryId:''}, {sort:''}))
      .then(() => { // return of async actions
        let actions = store.getActions();
        expect(actions[0].type).to.equal('DOC_TITLE_CHANGE');
        expect(actions[1].type).to.equal('LOAD_PRODUCTS_REQUEST')
        expect(actions[2].type).to.equal('LOAD_PRODUCTS_SUCCESS');
        expect(actions).to.deep.equal(expectedActions)
      })
  });

  it('calls LOAD_PRODUCTS_ERROR when products request errors', () => {
    const store = mockStore({ items: [] });
    const expectedActions = [
      { type: 'LOAD_PRODUCTS_REQUEST', categoryId:'', sort:'' },
      { type: 'LOAD_PRODUCTS_ERROR' }
    ];
    nock('http://localhost:3000')
      .get('/api/products/')
      .replyWithError(500);

    return store.dispatch(loadProducts({categoryId:''}, {sort:''}))
      .then(() => { // return of async actions
        let actions = store.getActions();
        expect(actions[0].type).to.equal('LOAD_PRODUCTS_REQUEST');
        expect(actions[1].type).to.equal('LOAD_PRODUCTS_ERROR');
        expect(actions).to.deep.equal(expectedActions)
      })
  });

});