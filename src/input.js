import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
//doesn't work because the state needs to be in app? 
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange={e => this.setState({ coffee: e.target.value })}
          placeholder= {this.props.input}
          style={{ width: "200px" }}
        />
      </div>

    );
  }
}

export default Input;
