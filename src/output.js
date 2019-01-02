import React, { Component } from 'react';
import './App.css';
class Output extends Component {
  render() {

    let purchasers = [];
    this.props.data.forEach( person => {
      let purchaser = purchasers.find(purchaser => {return purchaser.name == person.name});

      if (purchaser != undefined) {
        purchaser.purchased++
      }else {
        purchasers.push({name:person.name, purchased: 1})
      }
    })

    return (
      <div>
        <ul>
          {purchasers.length <= 0
            ? "NO DB ENTRIES YET"
            : purchasers.map(purchaser => (
                <li className="smallPadding">
                  <span className="output"> name: </span> {purchaser.name} <br />
                  <span className="output"> purchased: </span>{purchaser.purchased}
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default Output;
