import React, { Component } from 'react';
import './App.css';
import Moment from 'react-moment';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, MarkSeries} from 'react-vis';
import "react-vis/dist/style.css";


class Graph extends Component {


  render() {

    let coffeeByMonth = [];
    this.props.data.forEach( entry => {

      var monthofDate = new Date(entry.date);
      console.log("date is " + monthofDate);
      console.log("year is " + monthofDate.getYear());

      if (monthofDate.getYear() == 70 || monthofDate == 'Invalid Date'){
        console.log("GONE");
      }else{

        var months = coffeeByMonth.find(months => {return months.monthOpened === monthofDate.getMonth() && months.yearOpened === monthofDate.getYear()});

        if (months !== undefined) {
          months.purchased++
        }else{
          coffeeByMonth.push({monthOpened:monthofDate.getMonth(), yearOpened:monthofDate.getYear(), purchased: 1, sort:(12*monthofDate.getYear())+(monthofDate.getMonth())-1425})
        }
    }
    })

    coffeeByMonth.sort(function (a, b){
      return a.sort - b.sort;
    })

    let coffeeByMonthXY = coffeeByMonth.map( coffee => {return {x:coffee.sort, y:coffee.purchased}});

    console.log(coffeeByMonth);
    console.log(coffeeByMonthXY);

    return (

      <div className="bigPadding">
        <ul>
          {coffeeByMonth.length <= 0
            ? "NO DB ENTRIES YET"
            : coffeeByMonth.map(months => (
                <div key={months.monthOpened}>
                  <h2><Moment parse="M" format="MMMM">{months.monthOpened + 1}</Moment>/<Moment parse="YYYY" format="YYYY">{months.yearOpened + 1900}</Moment> : {months.purchased}</h2>
                </div>
              ))}
        </ul>

        <XYPlot
          width={900}
          height={300}>
          <HorizontalGridLines />
          <MarkSeries
            data={coffeeByMonthXY}/>
          <LineSeries
            data={coffeeByMonthXY}/>
          <XAxis />
          <YAxis />
        </XYPlot>

      </div>





    );
  }
}


export default Graph;
