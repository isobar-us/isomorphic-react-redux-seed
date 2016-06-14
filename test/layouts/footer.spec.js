import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Footer from '../../app/scripts/layouts/footer';

describe('footer', () => {

  beforeEach(function(){
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Footer />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('footer');
  });

});