import React, { Component } from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Alert, ListGroup, ListGroupItem} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import '../styles/invoice.css';
import InvoiceItemLines from './InvoiceItemLines';
import dateformat from 'dateformat';
import validator from 'email-validator';

class Invoice extends Component {

  constructor() {
    super();
    var date = new Date().toISOString();
    this.itemLine = 0;
    this.state = {
      dueDateIsPast: false,
      alertVisible: false,
      customerName: '',
      email: '',
      date: date,
      invoiceItemLines: [{
        id: `${this.itemLine}`,
        amount: '',
        description: ''
      }]
    };
  }

  handleInputChange = (e) => {
      this.setState({
        [e.currentTarget.name] : e.currentTarget.value
      });
  }

  validateEmail = () => {
    if (!validator.validate(this.state.email)) {
      this.setState({
        alertVisible:true,
        errorMessage: "Please enter valid email"
      });
    } else {
      this.setState({
        alertVisible:false,
      });
    }
  }

  validateForm = (invoiceDetails) => {
    let valid = false;

    if ((this.state.customerName) && (this.state.customerName.trim() !== '') &&
        (this.state.email) && (this.state.email.trim() !== '') &&
        (this.state.date) && (this.state.date.trim() !== '')) {
          valid = true;
        }
    console.log(valid);
    for (var i = 0; i < this.state.invoiceItemLines.length; i++) {
        if (!(invoiceDetails.invoiceItemLines[i].amount) && (invoiceDetails.invoiceItemLines[i].amount.trim() === '')) {
            valid = false;
            break;
        }
    }
    //console.log(invoiceDetails.name);
    //console.log(invoiceDetails.email);
    //console.log(invoiceDetails.date);
    //console.log(this.state.invoiceItemLines);
    console.log(valid);
    return valid;
  }

  handleDateChange = (value, formattedValue) => {
    let newdate = dateformat(new Date(value),"mm/dd/yyyy");
    this.setState({
      date: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
    //let testdate = dateformat(new Date(value),"mm/dd/yyyy");
    //console.log(testdate);
    //let backdate = dateformat(testdate,"isoDateTime")
    //console.log(backdate);
    //console.log(this.state.date)
    //console.log(new Date(value).getTime()-new Date().getTime());
    //console.log(value);
    //console.log(dateformat(new Date(),"isoDateTime"));
    //console.log(value-dateformat(new Date(),"isoUtcDateTime"));
    console.log(newdate === dateformat(new Date(),"mm/dd/yyyy"));
    if (new Date(value).getTime()-new Date().getTime() < 0 ) {
      if(newdate !== dateformat(new Date(),"mm/dd/yyyy")) {
        console.log("selected past");
        this.setState({
          dueDateIsPast:true
        });
      } else {
        this.setState({
          dueDateIsPast:false
        });
      }
    } else {
      this.setState({
        dueDateIsPast:false
      });
    }
  }

  handleSubmit = (evt) => {
    const invoiceID = "I"+Math.floor(Math.random() * 1000000);
    let invoiceDetails = {
      id: invoiceID,
      name: this.state.customerName,
      email: this.state.email,
      date: dateformat(this.state.date,"mm/dd/yyyy"),
      invoiceItemLines: this.state.invoiceItemLines,
      itemCount: this.state.invoiceItemLines.length
    }
    //console.log(invoiceDetails.name);
    //console.log(invoiceDetails.email);
    //console.log(invoiceDetails.date);
    //console.log(this.state.invoiceItemLines.length);
    if (this.validateForm(invoiceDetails)) {
      localStorage.setItem(invoiceID, JSON.stringify(invoiceDetails));
      alert("Submitted!!");
    } else {
      this.setState({
        alertVisible:true,
        errorMessage: "Please check if all fields are filled correctly"
      });
      //alert("Please check for one or more required field.");
      evt.preventDefault();
    }
    //localStorage.setItem(invoiceID, JSON.stringify(invoiceDetails));
  }

  handleAddLine = () => {
      this.itemLine++;
      //console.log(this.state.invoiceItemLines.length);
      this.setState({
        invoiceItemLines: this.state.invoiceItemLines.concat([{ id: `${this.itemLine}`, description: '', amount: ''}])
      });
  }

  handleRemoveLineItem = (event) => {
    const newList = this.state.invoiceItemLines;
    //console.log(newList);
    //newList.indexOf(newList.find(x => x.id === '1'))
    //console.log(newList.indexOf(newList.find(x => x.id === event.target.id)));
    //newList.splice(newList.indexOf(event.target.id),1);
    newList.splice(newList.indexOf(newList.find(x => x.id === event.target.id)),1);
    this.setState({
      invoiceItemLines: newList
    });
  }

  handleDescriptionChange = (event) => {
      this.setState({
        invoiceItemLines: this.state.invoiceItemLines.map((invoiceItemLine) => (
          parseInt(event.target.id, 10) === parseInt(invoiceItemLine.id,10) ? {...invoiceItemLine, description: event.target.value} : invoiceItemLine
        ))
      })
      //console.log(event.target.id);
      //console.log(this.state);
  }

  handleAmountChange = (event) => {

    var rgx = /^[0-9]*\.?[0-9]*$/;
    console.log(event.target.value.match(rgx));
    if (!event.target.value.match(rgx)) {
      this.setState({
        alertVisible: true,
        errorMessage: "Please enter valid amount"
      });
    } else {
      this.setState({
        invoiceItemLines: this.state.invoiceItemLines.map((invoiceItemLine) => (
          parseInt(event.target.id, 10) === parseInt(invoiceItemLine.id,10) ? {...invoiceItemLine, amount: event.target.value} : invoiceItemLine
        )),
        alertVisible: false,
      })
      //console.log(event.target);
      //console.log(this.state);
    }
  }

  handleAlertDismiss = () => {
    this.setState({alertVisible: false});
  }

  render() {
    return (
      <div className="Invoice-container">
        <h3>Add new Invoice here</h3>
        {this.state.dueDateIsPast &&
          <ListGroup>
            <ListGroupItem bsStyle="warning">Due date is past</ListGroupItem>
          </ListGroup>
        }

        {this.state.alertVisible &&
            <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <p>{this.state.errorMessage}</p>
            </Alert>
        }
       <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Customer name*
            </Col>
            <Col sm={5}>
              <FormControl
                  type="text"
                  placeholder="Jane Doe"
                  value = {this.state.customerName}
                  onChange = {this.handleInputChange}
                  name = "customerName"
                  className = "customerName"
              />
            </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Customer email*
            </Col>
            <Col sm={5}>
              <FormControl
                  type="email"
                  placeholder="Email"
                  value = {this.state.email}
                  onBlur = {this.validateEmail}
                  onChange = {this.handleInputChange}
                  name = "email"
                  className = "email"
              />
            </Col>
        </FormGroup>

        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Due Date*
            </Col>

            <Col sm={5}>
              <DatePicker dateFormat="MM/DD/YYYY" value={this.state.date} onChange={this.handleDateChange}/>
            </Col>
          </FormGroup>

          <InvoiceItemLines
            invoiceItemLines={this.state.invoiceItemLines}
            handleRemoveLineItem={this.handleRemoveLineItem}
            handleDescriptionChange={this.handleDescriptionChange}
            handleAmountChange={this.handleAmountChange}
          />

          <Button bsStyle="success" className="ItemLine-add-button" onClick={this.handleAddLine}>+</Button>

          <FormGroup>
            <Col sm={6}>
            </Col>
            <Col sm={5}>
              <div className="Total-amount">
                Total: US$ {
                  this.state.invoiceItemLines.reduce((sum, i) => (
                    sum = sum + +i.amount
                ), 0)
                }
              </div>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button className="Invoice-submit" type="submit">
                Add Invoice
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Invoice;
