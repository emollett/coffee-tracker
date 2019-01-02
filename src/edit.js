import React, { Component } from 'react';
import axios from "axios";

class Edit extends Component {

  // initialize our state
    state = {
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = idTodelete => {
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
    };


    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      this.props.data.forEach(dat => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });

      axios.post("/api/updateData", {
        id: objIdToUpdate,
        update: { message: updateToApply }
      });
    };

  render() {
    return (

      <div>
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
    )
  }

}

export default Edit;
