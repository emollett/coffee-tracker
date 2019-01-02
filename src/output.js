import React, { Component } from 'react';

class Output extends Component {
  render() {
    return (
      <div>
      <ul>
        {this.props.purchasers.length <= 0
          ? "NO DB ENTRIES YET"
          : this.props.purchasers.map(purchaser => (
              <li style={{ padding: "10px" }}>
                <span style={{ color: "gray" }}> name: </span> {purchaser.name} <br />
                <span style={{ color: "gray" }}> purchased: </span>{purchaser.purchased}
              </li>
            ))}
      </ul>
      </div>
    );
  }
}

export default Output;
