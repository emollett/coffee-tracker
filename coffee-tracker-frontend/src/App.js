import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {Route, withRouter, Switch} from 'react-router-dom';
import './App.css';
import Output from './output.js';
import Admin from './admin.js';
import io from 'socket.io-client';


class App extends Component {

    state = {
      data: [],
      intervalIsSet: false,
      hasInitialData: false,
    };

    socket;

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      this.socket = io.connect("http://127.0.0.1:3001");
      //this is where we are listening for the socket.io message sent from the server, which tells us to go and get the data again if something has changed.
      this.socket.on("NewData", this.getDataFromDb);
    };


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
        <Switch>
          <Route exact path="/" >
            <Output data={this.state.data}/>
          </Route>
          <Route exact path="/admin" >
            <Admin data={this.state.data}/>
          </Route>
        </Switch>
      );
    }
  }

export default withRouter(App);
