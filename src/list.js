import React, { Component } from 'react';
import axios from "axios";

class List extends Component {



  render() {
    return (

      <div>
        <ul>
          {this.props.data && this.props.data.length <= 0
            ? "NO DB ENTRIES YET"
            : this.props.data.map(dat => (
                <li style={{ padding: "10px" }} key={this.props.data.id}>
                  <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style={{ color: "gray" }}> name: </span>{dat.name} <br />
                  <span style={{ color: "gray" }}> date: </span>{dat.date} <br />
                  <span style={{ color: "gray" }}> coffee: </span>{dat.coffee} <br />
                  <span style={{ color: "gray" }}> note: </span>{dat.message}
                </li>
              ))}
        </ul>
      </div>
    )
  }

}

export default List;
