import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {SortList} from '../../app/scripts/components/sortList';

describe('sortList', () => {

  beforeEach(function(){
    this.props = {categoryId:'', sort:''};
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<SortList {...this.props} />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('div');
  });

});