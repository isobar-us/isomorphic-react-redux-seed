import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {FiltersList} from '../../app/scripts/components/filtersList/component';
import filtersReducer from '../../app/scripts/components/filtersList/reducer';
import {Map} from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {loadCategories} from '../../app/scripts/components/filtersList/actions';


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

  let state = filtersReducer.fn(Map(), {type:'LOAD_CATEGORIES_REQUEST'});

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

  it('reducer LOAD_CATEGORIES_REQUEST returns expected state', function () {
    let state = filtersReducer.fn(Map(), {type:'LOAD_CATEGORIES_REQUEST'});
    state = state.toJS();
    expect(state.categories.items.length).to.equal(0);
    expect(state.categories.loading).to.be.true;
  });

});

describe('filtersList-actions', () => {

  let scope;
  const expectedActions = [
      { type: 'LOAD_CATEGORIES_REQUEST' },
      { type: 'LOAD_CATEGORIES_SUCCESS', items: [{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}] }
    ],
    data = [{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}],
    mockStore = configureMockStore([ thunk ]);

  beforeEach(function() {
    scope = nock('http://localhost:3000')
      .get('/api/categories')
      .reply(200, data);
  });

  afterEach(() => {
    nock.cleanAll()
  });

  it('creates LOAD_CATEGORIES_SUCCESS when loading categories has been done', () => {
    const store = mockStore({ items: [] });
    return store.dispatch(loadCategories())
      .then(() => { // return of async actions
        let actions = store.getActions();
        expect(actions[0].type).to.equal('LOAD_CATEGORIES_REQUEST');
        expect(actions[1].type).to.equal('LOAD_CATEGORIES_SUCCESS');
        expect(actions).to.deep.equal(expectedActions)
      })
  });

});