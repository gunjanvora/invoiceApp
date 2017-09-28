import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import logo from './logo.svg';
import Invoice from './components/Invoice';
import InvoiceList from './components/InvoiceList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Invoice App</h2>
        </div>

        <div className="App-container">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Add new Invoice">
            <Invoice/>
          </Tab>

          <Tab eventKey={2} title="View Invoices">
            <InvoiceList/>
          </Tab>
        </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
