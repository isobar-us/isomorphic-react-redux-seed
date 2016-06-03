import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Wrapper from '../../app/scripts/layouts/wrapper';

describe('wrapper', function () {

  it('renders without problems', function () {
    var wrapper = TestUtils.renderIntoDocument(<Wrapper />);
    expect(wrapper).to.exist;
  });

});