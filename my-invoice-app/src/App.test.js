import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import {expect} from 'chai';

it('App renders without crashing', () => {
  shallow(<App />);
});

it('App heading is present', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(".App-container")).to.have.length(1);
});
