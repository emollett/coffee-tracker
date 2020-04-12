import React, { Component } from 'react';
import axios from "axios";
import '../App.css';

class Input extends Component {

  // initialize our state
    state = {
      id: 0,
      message: null,
      name: null,
      coffee: null,
      datePurchased: null,
      date: null,
    };

    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message, name, coffee, date, datePurchased, event) => {

      event.preventDefault(); // stop the page from refreshing

      // just a note, here, in the front end, we use the id key of our data object
      // in order to identify which we want to Update or delete.
      // for our back end, we use the object id assigned by MongoDB to modify
      // data base entries

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
        date: date,
        datePurchased: datePurchased,
      });

      document.getElementById("new-coffee-form").reset();
    };

  render() {
    return (
      <form id="new-coffee-form" className="bigPadding" onSubmit={(event) => this.putDataToDB(this.state.message, this.state.name, this.state.coffee, this.state.date, this.state.datePurchased, event)}>

        <div className="smallPadding">
          <label htmlFor="coffee">Add a coffee to the database</label><br></br>
          <input
            id="coffee"
            type="text"
            required
            onChange={e => this.setState({ coffee: e.target.value })}
          />
        </div>

        <div className="smallPadding">
          <label htmlFor="name">Who bought the coffee?</label><br></br>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            required
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="smallPadding">
          <label htmlFor="datePurchased">What date was it purchased?</label><br></br>
          <input
            id="datePurchased"
            type="date"
            onChange={e => this.setState({ datePurchased: e.target.value })}
          />
        </div>

        <div className="smallPadding">
          <label htmlFor="dateOpened">What date was it opened?</label><br></br>
          <input
            id="dateOpened"
            type="date"
            onChange={e => this.setState({ date: e.target.value })}
          />
        </div>

        <div className="smallPadding">
          <label htmlFor="message">Add a note about the coffee</label><br></br>
          <input
            id="message"
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
          />
        </div>

        <div className="smallPadding">
          <button data-testid="submitCoffeeTest" type="submit">
            <h4>Add to database</h4>
          </button>
        </div>

      </form>
    );
  }
}

export default Input;
