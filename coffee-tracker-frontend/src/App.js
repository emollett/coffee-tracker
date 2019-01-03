import React, { Component } from 'react';
import './App.css';
import Input from './input.js';
import Output from './output.js';
import Edit from './edit.js';
import List from './list.js';
import axios from "axios";

class App extends Component {

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


    render() {
      if (!this.state.hasInitialData ) return <h1>Loading...</h1>;

      return (
        <div>
          <Output data={this.state.data} />

          <ul class="nav nav-tabs nav-justified">
            <li class="active"><a data-toggle="tab" href="#add"><h3>Add a Coffee</h3></a></li>
            <li><a data-toggle="tab" href="#seeAll"><h3>See all entries</h3></a></li>
            <li><a data-toggle="tab" href="#edit"><h3>Edit an entry</h3></a></li>
          </ul>

          <div class="tab-content">
            <div id="add" class="tab-pane fade in active">
              <Input data={this.state.data}/>
            </div>
            <div id="seeAll" class="tab-pane fade in active">
              <List data={this.state.data}/>
            </div>
            <div id="edit" class="tab-pane fade in active">
              <Edit data={this.state.data}/>
            </div>
          </div>

        </div>
      );
    }
  }

export default App;
