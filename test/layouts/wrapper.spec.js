import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Wrapper from '../../app/scripts/layouts/wrapper';

describe('wrapper', () => {

  beforeEach(function(){
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Wrapper />);
    this.output = this.renderer.getRenderOutput();
  });

  it('renders without problems', function () {
    expect(this.output).to.exist;
    expect(this.output.type).to.equal('div');
    expect(this.output.props.children.length).to.equal(3);
  });

});