import React from 'react';
import ReactDOM from 'react-dom';
import Invoice from './components/Invoice';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

it('Invoice renders without crashing', () => {
  shallow(<Invoice />);
});

it('Invoice Form is present', () => {
  const invoiceWrapper = shallow(<Invoice />);
  expect(invoiceWrapper.find('Form')).to.have.length(1);
});

it('Name field is present', () => {
  const invoiceWrapper = shallow(<Invoice />);
  expect(invoiceWrapper.find('.customerName')).to.have.length(1);
});

it('email field is present', () => {
  const invoiceWrapper = shallow(<Invoice />);
  expect(invoiceWrapper.find('.email')).to.have.length(1);
});

it('Add Item line button is present', () => {
  const invoiceWrapper = shallow(<Invoice />);
  expect(invoiceWrapper.find('.ItemLine-add-button')).to.have.length(1);
});

it('Total amount is present', () => {
  const invoiceWrapper = shallow(<Invoice />);
  expect(invoiceWrapper.find('.Total-amount').text()).to.include("Total: US$ 0");
});

it('Submit button is present', () => {
  const invoiceWrapper = shallow(<Invoice />);
  expect(invoiceWrapper.find('Button.Invoice-submit')).to.have.length(1);
});

it('Total should be correct', () => {
  const invoiceWrapper = mount(<Invoice />);
  invoiceWrapper.setState({
      invoiceItemLines: [{
        id: 1,
        amount: 10,
        description: 'item 1'
      },{
        id: 2,
        amount: 20,
        description: 'item 2'
      }]
    });
    expect(invoiceWrapper.find('.Total-amount').text()).to.include("Total: US$ 30");
});

it('Remove button should be correctly desplayed', () => {
  const invoiceWrapper = mount(<Invoice />);
  invoiceWrapper.setState({
      invoiceItemLines: [{
        id: 1,
        amount: 10,
        description: 'item 1'
      },{
        id: 2,
        amount: 20,
        description: 'item 2'
      }]
    });
    expect(invoiceWrapper.find('.ItemLine-remove')).to.have.length(2);
});

it('Add button should be correctly desplayed', () => {
  const invoiceWrapper = mount(<Invoice />);
  invoiceWrapper.setState({
      invoiceItemLines: [{
        id: 1,
        amount: 10,
        description: 'item 1'
      },{
        id: 2,
        amount: 20,
        description: 'item 2'
      }]
    });
    expect(invoiceWrapper.find('.ItemLine-add-button')).to.have.length(1);
    expect(invoiceWrapper.find('.ItemLine-add-button')).to.not.have.length(2);
});
