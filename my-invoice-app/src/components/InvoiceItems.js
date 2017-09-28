import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class InvoiceItems extends Component {

  constructor() {
    super();
    this.jobTypes = [ 'A', 'B', 'C', 'D' ];
  }

  render() {
    const cellEditProp = {
      mode: 'click'
    };
    const selectRow = {
      mode: 'checkbox',
      cliclToSelct: true
    };
    return (
      <BootstrapTable insertRow={ true } deleteRow={ true } selectRow={ selectRow } cellEdit={ cellEditProp }>
      <TableHeaderColumn dataField='id' dataSort={ true } isKey={ true }>Job ID</TableHeaderColumn>
      <TableHeaderColumn dataField='description' dataSort={ true } editable={ { type: 'textarea' } }>Description</TableHeaderColumn>
      <TableHeaderColumn dataField='amount' dataSort={ true } editable={ { type: 'textarea' } }>Amount</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default InvoiceItems;
