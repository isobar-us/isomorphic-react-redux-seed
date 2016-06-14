import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Home from '../../app/scripts/components/home';

describe('home', () => {

  beforeEach(function(){
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Home />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('div');
  });

});