import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import '../styles/viewInvoice.css';
import {getInvoiceList} from '../Utils/util.js'

class ViewInvoice extends Component {

  constructor() {
    super();
    this.state = {
      invoices: getInvoiceList(),
    };
  }

  render() {
    return (
      <div className="Invoice-table">
      <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Customer Name</th>
        <th>Customer email</th>
        <th>Invoice Due Date</th>
        <th>Number of items</th>
        <th>Invoice Amount</th>
      </tr>
    </thead>
    <tbody>
    {this.state.invoices &&
    this.state.invoices.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.date}</td>
              <td>{item.invoiceItemLines.length}</td>
              <td>{item.invoiceItemLines.reduce((sum, i) => (
                sum = sum + +i.amount
            ), 0)} $</td>
            </tr>
        ))}
    </tbody>
  </Table>
      </div>
    );
  }
}

export default ViewInvoice;
