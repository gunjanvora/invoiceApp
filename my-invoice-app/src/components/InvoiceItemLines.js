import React, { Component } from 'react';
import {FormGroup, Col, FormControl, Button} from 'react-bootstrap';

class InvoiceItemLines extends Component {

  handleRemoveLineItem =(event) => {
    this.props.handleRemoveLineItem(event);
  }

  handleDescriptionChange = (event) => {
    this.props.handleDescriptionChange(event);
  }

  handleAmountChange = (event) => {
    this.props.handleAmountChange(event);
  }

  render() {
    return (
      <div>
      <FormGroup controlId="formHorizontalName">
          <Col sm={7}>
            <h4>Description</h4>
          </Col>

          <Col sm={3}>
            <h4>Amount</h4>
          </Col>
      </FormGroup>

      { this.props.invoiceItemLines.map((itemLine) => (
        <div key={itemLine.id} id={itemLine.id}>
        <FormGroup controlId={`${itemLine.id}`} key={itemLine.id} id={itemLine.id}>
            <Col sm={7}>
            <FormControl
                type="text"
                placeholder="Description Here"
                name = "description"
                onBlur={(e) => this.handleDescriptionChange(e)}
                className = "Desc-input"
            />
            </Col>
            <Col sm={3}>
              <FormControl
                  type="text"
                  placeholder="Amount here"
                  name = "amount"
                  onChange={(e) => this.handleAmountChange(e)}
                  className = "Amount-input"
              />
            </Col>
            <Col sm={1}>
              <Button key={itemLine.id}
              id={itemLine.id}
              bsStyle="danger"
              onClick={(e) => this.handleRemoveLineItem(e)}
              className="ItemLine-remove">-</Button>
            </Col>
        </FormGroup>
        </div>
      )) }


      </div>
    )
  }
}

export default InvoiceItemLines;
