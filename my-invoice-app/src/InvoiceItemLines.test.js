import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceItemLines from './components/InvoiceItemLines';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from "sinon";


describe ("Invoice Item Lines tests", () => {

  const invoiceItemLines = [{
        id: 1,
        amount: 10,
        description: 'test item'
      }];

  it('Invoice renders without crashing', () => {
    shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines}/>);
  });

  it('Description field is present', () => {
    const invoiceWrapper = shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines}/>);
    expect(invoiceWrapper.find('.Desc-input')).to.have.length(1);
  });

  it('Amount field is present', () => {
    const invoiceWrapper = shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines}/>);
    expect(invoiceWrapper.find('.Amount-input')).to.have.length(1);
  });

  it('Remove Item Line button is present', () => {
    const invoiceWrapper = shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines}/>);
    expect(invoiceWrapper.find('.ItemLine-remove')).to.have.length(1);
  });

  it('Amount field change should trigger onChange', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines} handleAmountChange={onChangeSpy} />);
    wrapper.find('.Amount-input').simulate("change");
    expect(onChangeSpy.calledOnce).to.be.true;
  });

  it('Description field change should trigger onBlur', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines} handleDescriptionChange={onChangeSpy} />);
    wrapper.find('.Desc-input').simulate("blur");
    expect(onChangeSpy.calledOnce).to.be.true;
  });

  it('Description field change should trigger onChange', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<InvoiceItemLines invoiceItemLines={invoiceItemLines} handleRemoveLineItem={onChangeSpy} />);
    wrapper.find('.ItemLine-remove').simulate("click");
    expect(onChangeSpy.calledOnce).to.be.true;
  });

})
