import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class List extends Component {



  render() {
    return (

      <div>
        <ul>
          {this.props.data && this.props.data.length <= 0
            ? "NO DB ENTRIES YET"
            : this.props.data.map(dat => (
                <li className="smallPadding" key={this.props.data.id}>
                  <span className="output"> id: </span> {dat.id} <br />
                  <span className="output"> name: </span>{dat.name} <br />
                  <span className="output"> date: </span>{dat.date} <br />
                  <span className="output"> coffee: </span>{dat.coffee} <br />
                  <span className="output"> note: </span>{dat.message}
                </li>
              ))}
        </ul>
      </div>
    )
  }

}

export default List;
