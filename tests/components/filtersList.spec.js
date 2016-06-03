import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {FiltersList} from '../../app/scripts/components/filtersList/component';
import reducer from '../../app/scripts/components/filtersList/reducer';
import {Map} from 'immutable';

describe('filtersList', function () {

  function setup() {
    let props = {
      categoryId: '1',
      categories: [{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}],
      sort: 'pricedesc'
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<FiltersList {...props} />);
    let output = renderer.getRenderOutput();

    return {
      props,
      output,
      renderer
    }
  }

  it('renders without problems', function () {
    const { props, output } = setup();
    expect(output).to.exist;
    expect(output.type).to.equal('nav');
    expect(output.props.children.length).to.equal(props.categories.length);
  });

  it('reducer LOAD_CATEGORIES returns expected state', function () {
    let state = reducer.fn(Map(), {type:'LOAD_CATEGORIES'});
    state = state.toJS();
    expect(state.categories.items.length).to.equal(0);
    expect(state.categories.loading).to.be.true;
  });

});