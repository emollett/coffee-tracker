import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class Input extends Component {

  // initialize our state
    state = {
      id: 0,
      message: null,
      name: null,
      coffee: null,
      date: null,
    };

    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message, name, coffee, date) => {
      let currentIds = this.props.data.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }

      axios.post("/api/putData", {
        id: idToBeAdded,
        message: message,
        name: name,
        coffee: coffee,
        date: date
      });
    };

  render() {
    return (
      <div>
        <div className="smallPadding">
          <input
            type="text"
            onChange={e => this.setState({ coffee: e.target.value })}
            placeholder="add a coffee to the database"
          />
        </div>
        <div className="smallPadding">
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="who bought the coffee?"
          />
        </div>
        <div className="smallPadding">
          <input
            type="date"
            onChange={e => this.setState({ date: e.target.value })}
            placeholder="what date was it opened"
          />
        </div>
        <div className="smallPadding">
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add a note about the coffee"
          />
        </div>
        <div className="smallPadding">
          <button onClick={() => this.putDataToDB(this.state.message, this.state.coffee, this.state.name, this.state.date)}>
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default Input;
