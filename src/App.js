import React, { Component } from 'react';
import './App.css';
import Input from './input.js';
import Output from './output.js';
import Edit from './edit.js';
import axios from "axios";

class App extends Component {

  // initialize our state
    state = {
      data: [],
      intervalIsSet: false,
      hasInitialData: false,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval});
      }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch("/api/getData")
        .then(data => data.json())
        .then(res => {
          this.setState({ data: res.data, hasInitialData:true })
      });
    };


    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
      if (!this.state.hasInitialData ) return <h1>Loading...</h1>;

      let purchasers = [];
      this.state.data.forEach( person => {
        let purchaser = purchasers.find(purchaser => {return purchaser.name == person.name});

        if (purchaser != undefined) {
          purchaser.purchased++
        }else {
          purchasers.push({name:person.name, purchased: 1})
        }
      })

      return (
        <div>
          INPUT COFFEE
          <Input data={this.state.data}/>

          COFFEE TRACKER
          <Output purchasers={purchasers} />

          ALL ENTRIES
          <ul>
            {this.state.data && this.state.data.length <= 0
              ? "NO DB ENTRIES YET"
              : this.state.data.map(dat => (
                  <li style={{ padding: "10px" }} key={this.state.data.id}>
                    <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                    <span style={{ color: "gray" }}> name: </span>{dat.name} <br />
                    <span style={{ color: "gray" }}> date: </span>{dat.date} <br />
                    <span style={{ color: "gray" }}> coffee: </span>{dat.coffee} <br />
                    <span style={{ color: "gray" }}> note: </span>{dat.message}
                  </li>
                ))}
          </ul>

          EDIT ENTRIES
          <Edit data={this.state.data}/>
        </div>
      );
    }
  }

export default App;
