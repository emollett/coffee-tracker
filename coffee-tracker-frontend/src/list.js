import React, { Component } from 'react';
import Moment from 'react-moment';
import './App.css';

class List extends Component {

  render() {

    if (this.props.data && this.props.data.length < 1) return <p>No coffee entered yet</p>;

    this.reversed = this.props.data.reverse();

    return (
      <div className="smallPadding">
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date Purchased</th>
            <th>Date Opened</th>
            <th>Coffee</th>
            <th>Note</th>
          </tr>
          </thead>
          <tbody>
					{this.reversed.map(data => (
          <tr key={data.id}>
            <td>
							{data.id}
            </td>
            <td>
							{data.name}
            </td>
            <td>
              {
                ((typeof(data.datePurchased) === 'undefined') || (data.datePurchased === null))
                  ? <p>No data</p>
                  : <Moment format="DD/MM/YYYY">{data.datePurchased}</Moment>
              }
            </td>
            <td>
              {
                ((typeof(data.date) === 'undefined') || (data.date === null))
                  ? <p>No data</p>
                  : <Moment format="DD/MM/YYYY">{data.date}</Moment>
              }
            </td>
            <td>
							{data.coffee}
            </td>
            <td>
							{data.message}
            </td>
          </tr>
					))}
          </tbody>
        </table>
      </div>
    )
  }

}

export default List;
