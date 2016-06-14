import {expect} from 'chai';
import {Map} from 'immutable';
import reducer, {combineReducer} from '../app/scripts/reducer';

describe('reducer', () => {

  it('reducer DOC_TITLE_CHANGE returns expected state', () => {
    const title = 'Test Title';
    let state = reducer(undefined, {type:'DOC_TITLE_CHANGE', title:title});
    state = state.toJS();
    expect(state.title).to.equal(title);
  });

  it('combineReducer merges reducer fn with parent reducer', () => {
    combineReducer({
      key: 'testReducer',
      fn(state = Map(), action) {
        switch (action.type) {
          case 'TEST_REDUCER_ACTION':
            return state.set('test', true);
        }
        return state;
      }
    });
    let state = reducer(Map(), {type:'TEST_REDUCER_ACTION'});
    state = state.toJS();
    expect(state.test).to.be.true;
  });

});