import React, { Component } from 'react';
import '../styles/NewItemList.css';

class NewItemList extends Component {

  handleAmountChange = (event) => {
    this.props.handleLineAmountChange(event);
  }

  render() {
    return (
      <div key={this.props.id} id={this.props.id} className="Item-list">
      <input type="text" id={this.props.id} key={`desc-${this.props.id}`} className="description" name="description"/>
      <input type="text" id={this.props.id} key={`amount-${this.props.id}`} className="amount" name="amount" onBlur={(e) => this.handleAmountChange(e)}/>
      </div>
    );
  }
}

export default NewItemList;
