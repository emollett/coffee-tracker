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
      <form className="bigPadding">

        <div className="smallPadding">
        <h4>Add a coffee to the database</h4>
          <input
            type="text"
            required
            onChange={e => this.setState({ coffee: e.target.value })}
          />
        </div>

        <div className="smallPadding">
        <h4>Who bought the coffee?</h4>
          <input
            type="text"
            autoComplete="on"
            required
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="smallPadding">
        <h4>What date was it opened?</h4>
          <input
            type="date"
            onChange={e => this.setState({ date: e.target.value })}
          />
        </div>

        <div className="smallPadding">
        <h4>Add a note about the coffee</h4>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
          />
        </div>

        <div className="smallPadding">
          <button onClick={() => this.putDataToDB(this.state.message, this.state.name, this.state.coffee, this.state.date)}>
            <h4>Add to database</h4>
          </button>
        </div>
      </form>
    );
  }
}

export default Input;
