import React, { Component } from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {

    alert(this.state.coffee + ' was bought by ' + this.state.name + " on " + this.state.date);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div style={{ padding: "10px" }}>
        <label>
          Name:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
      </div>
      <div style={{ padding: "10px" }}>
        <label>
          Coffee:
          <input name="coffee" type="text" value={this.state.coffee} onChange={this.handleChange} />
        </label>
      </div>
      <div style={{ padding: "10px" }}>
        <label>
          Date:
          <input name="date" type="date" value={this.state.date} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </div>
      </form>

      
    );
  }
}



export default Input;
