import React, { Component } from 'react';
import './App.css';
import Input from './input.js';
import Output from './output.js';
import axios from "axios";

class App extends Component {

  // initialize our state
    state = {
      data: [],
      // id: 0,
      // message: null,
      // name: null,
      // coffee: null,
      // date: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
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

    // // our put method that uses our backend api
    // // to create new query into our data base
    // putDataToDB = (message, coffee, name, date) => {
    //   let currentIds = this.state.data.map(data => data.id);
    //   let idToBeAdded = 0;
    //   while (currentIds.includes(idToBeAdded)) {
    //     ++idToBeAdded;
    //   }
    //
    //   axios.post("/api/putData", {
    //     id: idToBeAdded,
    //     message: message,
    //     coffee: coffee,
    //     name: name,
    //     date: date
    //   });
    // };


    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = idTodelete => {
      let objIdToDelete = null;
      this.state.data.forEach(dat => {
        if (dat.id == idTodelete) {
          objIdToDelete = dat._id;
        }
      });

      axios.delete("/api/deleteData", {
        data: {
          id: objIdToDelete
        }
      });
    };


    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      this.state.data.forEach(dat => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });

      axios.post("/api/updateData", {
        id: objIdToUpdate,
        update: { message: updateToApply }
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
          <div style={{ padding: "10px" }}>
            <input
              type="text"
              style={{ width: "200px" }}
              onChange={e => this.setState({ idToDelete: e.target.value })}
              placeholder="put id of item to delete here"
            />
            <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
              DELETE
            </button>
          </div>

          <div style={{ padding: "10px" }}>
            <input
              type="text"
              style={{ width: "200px" }}
              onChange={e => this.setState({ idToUpdate: e.target.value })}
              placeholder="id of item to update here"
            />
            <input
              type="text"
              style={{ width: "200px" }}
              onChange={e => this.setState({ updateToApply: e.target.value })}
              placeholder="put new value of the item here"
            />
            <button
              onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
              }
            >
              UPDATE
            </button>
          </div>

        </div>
      );
    }
  }

export default App;
