import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Header from '../../app/scripts/layouts/header';

describe('header', () => {

  beforeEach(function(){
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Header />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('header');
  });

});