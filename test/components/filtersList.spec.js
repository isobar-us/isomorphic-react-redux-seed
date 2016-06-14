import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {FiltersList} from '../../app/scripts/components/filtersList/component';
import filtersReducer from '../../app/scripts/components/filtersList/reducer';
import {loadCategories} from '../../app/scripts/components/filtersList/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

describe('filtersList-component', () => {

  beforeEach(function() {
    this.props = {
      categoryId: '1',
      categories: [{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}],
      sort: 'pricedesc'
    };
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<FiltersList {...this.props} />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('nav');
    expect(this.output.props.children.length).to.equal(this.props.categories.length);
  });

});

describe('filtersList-reducer', () => {

  it('reducer LOAD_CATEGORIES_REQUEST returns expected state', function () {
    let state = filtersReducer.fn(undefined, {type:'LOAD_CATEGORIES_REQUEST'});
    state = state.toJS();
    expect(state.categories.items.length).to.equal(0);
    expect(state.categories.loading).to.be.true;
  });

  it('reducer LOAD_CATEGORIES_SUCCESS returns expected state', function () {
    let state = filtersReducer.fn(undefined, {type:'LOAD_CATEGORIES_SUCCESS', items:[{},{}]});
    state = state.toJS();
    expect(state.categories.items.length).to.equal(2);
    expect(state.categories.loading).to.be.false;
  });

  it('reducer LOAD_CATEGORIES_ERROR returns expected state', function () {
    let state = filtersReducer.fn(undefined, {type:'LOAD_CATEGORIES_ERROR'});
    state = state.toJS();
    expect(state.categories.items.length).to.equal(0);
    expect(state.categories.loading).to.be.false;
  });

});

describe('filtersList-actions', () => {

  const data = [{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}],
    mockStore = configureMockStore([ thunk ]);

  afterEach(() => {
    nock.cleanAll()
  });

  it('calls LOAD_CATEGORIES_SUCCESS when categories request succeeds', () => {
    const store = mockStore({ items: [] });
    const expectedActions = [
      { type: 'LOAD_CATEGORIES_REQUEST' },
      { type: 'LOAD_CATEGORIES_SUCCESS', items:data }
    ];
    nock('http://localhost:3000')
      .get('/api/categories')
      .reply(200, data);

    return store.dispatch(loadCategories())
      .then(() => { // return of async actions
        let actions = store.getActions();
        expect(actions[0].type).to.equal('LOAD_CATEGORIES_REQUEST');
        expect(actions[1].type).to.equal('LOAD_CATEGORIES_SUCCESS');
        expect(actions).to.deep.equal(expectedActions)
      })
  });

  it('calls LOAD_CATEGORIES_ERROR when categories request errors', () => {
    const store = mockStore({ items: [] });
    const expectedActions = [
      { type: 'LOAD_CATEGORIES_REQUEST' },
      { type: 'LOAD_CATEGORIES_ERROR' }
    ];
    nock('http://localhost:3000')
      .get('/api/categories')
      .replyWithError(500);

    return store.dispatch(loadCategories())
      .then(() => { // return of async actions
        let actions = store.getActions();
        expect(actions[0].type).to.equal('LOAD_CATEGORIES_REQUEST');
        expect(actions[1].type).to.equal('LOAD_CATEGORIES_ERROR');
        expect(actions).to.deep.equal(expectedActions)
      })
  });

});