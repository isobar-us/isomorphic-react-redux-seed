import {expect} from 'chai';
import pageTitle from '../app/scripts/pageTitle';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('pageTitle', () => {

  const mockStore = configureMockStore([ thunk ]);
  let store;

  beforeEach(() => {
    store = mockStore({});
    pageTitle.init(store);
  });

  it('getDefault returns a string', () => {
    expect(typeof pageTitle.getDefault()).to.equal('string');
  });

  it('set dispatches redux action with new title', () => {
    const newTitle = 'Test Title';
    pageTitle.set(newTitle);
    let action = store.getActions()[0];
    expect(action.type).to.equal('DOC_TITLE_CHANGE');
    expect(action.title.indexOf(newTitle)).to.not.equal(-1)
  });

});