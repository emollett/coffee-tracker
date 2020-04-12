import React, { Component } from 'react';
import {Route, Router, withRouter} from 'react-router-dom';
import '../App.css';
import Output from '../Output/Output';
import io from 'socket.io-client';
import Admin from '../Admin/Admin';
import Graph from '../Graph/Graph';
import history from '../history';

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
      //("http://127.0.0.1:3001") for local, () for live
      this.socket = io.connect(process.env.REACT_APP_SOCKET_CONNECTION);
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

        <Router history={history}>
          <div>
            <Route exact path="/" render={(props) => <Output data={this.state.data}/>} />
            <Route exact path="/admin" render={(props) => <Admin data={this.state.data } />} />
            <Route exact path="/graph" render={(props) => <Graph data={this.state.data }/>} />
          </div>
        </Router>

      );
    }
  }

export default withRouter(App);
