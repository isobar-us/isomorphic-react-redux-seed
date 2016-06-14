import React from 'react';
import {expect} from 'chai';
import {loadAsyncNeeds} from '../app/scripts/isomorphic';

describe('isomorphic', () => {

  class Test extends React.Component {
    render() {
      return (
        <div>test</div>
      );
    }
  }

  let dispatch, components, params, query;

  beforeEach(() => {
    dispatch = function(){};
    params = {};
    query = {};
  });

  it('loadAsyncNeeds resolves when there are no async needs', (done) => {
    Test.needs = [];
    components = [Test];
    let promise = loadAsyncNeeds(dispatch, components, params, query);
    promise.then((val) => {
      expect(val).to.equal(undefined);
      done();
    })
  });

  it('loadAsyncNeeds resolves when async needs have been loaded', (done) => {
    const need = function() {
      return function() {
        return new Promise();
      }
    };
    const reducer = {
      key: 'testIso',
      fn(state) {
        return state;
      }
    };
    Test.needs = [need];
    Test.reducers = [reducer];
    components = [Test];
    let promise = loadAsyncNeeds(dispatch, components, params, query);
    promise.then((val) => {
      expect(val.length).to.equal(1);
      expect(val[0]).to.equal(undefined);
      done();
    })
  });

});