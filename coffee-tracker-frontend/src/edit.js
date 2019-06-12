import React, { Component } from 'react';
import axios from "axios";
import './App.css';


class Edit extends Component {

  // initialize our state
    state = {
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };


    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete, event) => {

      event.preventDefault(); // stop the page from refreshing

      let objIdToDelete = null;
      this.props.data.forEach(dat => {
        if (dat.id == idTodelete) {
          objIdToDelete = dat._id;
        }
      });

      axios.delete("/api/deleteData", {
        data: {
          id: objIdToDelete
        }
      });

      document.getElementById("deleting-form").reset();
    };


    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply, updateToDate, event) => {

      event.preventDefault(); // stop the page from refreshing

      let objIdToUpdate = null;
      this.props.data.forEach(dat => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });

      axios.post("/api/updateData", {
        id: objIdToUpdate,
        update: {
          message: updateToApply,
          date: updateToDate}
      });

      document.getElementById("updating-form").reset();
    };

  render() {
    return (

      <div className="outputBoxEdit">

        <form id="deleting-form" className="deleting">
            <div className="smallPadding">
              <h4>Id of item to delete</h4>
                <input
                  type="text"
                  onChange={e => this.setState({ idToDelete: e.target.value })}
                />
            </div>

            <div className = "smallPadding">
              <button onClick={(event) => this.deleteFromDB(this.state.idToDelete, event)}>
                <h4>DELETE</h4>
              </button>
            </div>
        </form>

        <form id="updating-form" className="editing">
            <div className="smallPadding">
              <h4>Id of item to update</h4>
                <input
                  type="text"
                  onChange={e => this.setState({ idToUpdate: e.target.value })}
                />
              <h4>New message</h4>
                <input
                  type="text"
                  onChange={e => this.setState({ updateToApply: e.target.value })}
                />
              <h4>New opened date</h4>
                <input
                  type="date"
                  onChange={e => this.setState({ updateToDate: e.target.value })}
                />
            </div>

            <div className="smallPadding">
              <button onClick={(event) => this.updateDB(this.state.idToUpdate, this.state.updateToApply, this.state.updateToDate, event)}>
                <h4>UPDATE</h4>
              </button>
            </div>
        </form>

      </div>
    )
  }

}

export default Edit;
