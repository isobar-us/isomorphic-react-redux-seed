import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Aside from '../../app/scripts/layouts/aside';

describe('aside', () => {

  beforeEach(function(){
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Aside />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('aside');
  });

});