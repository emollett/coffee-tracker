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
          coffeeByMonth.push({monthOpened:monthofDate.getMonth(), yearOpened:monthofDate.getYear(), purchased: 1, sortNumber:(12*monthofDate.getYear())+(monthofDate.getMonth())-1425})
        }

      }
    })

    coffeeByMonth.sort(function (a, b){
      return a.sortNumber - b.sortNumber;
    })

    //go through coffee by month starting with the first year, first month
    var i;
    for (i=0; i<(coffeeByMonth.length-1); i++){
      console.log("The month is " + coffeeByMonth[i].monthOpened);
        //if a month is missing, insert an entry for that month with no purchases
        if (coffeeByMonth[i].sortNumber == coffeeByMonth[i+1].sortNumber - 1){
          console.log("and it is the same as the next month plus 1");
        }else{
          console.log("Oh no, we skipped one")
          coffeeByMonth.splice(i+1, 0, {monthOpened:(coffeeByMonth[i].monthOpened + 1), yearOpened:coffeeByMonth[i].yearOpened, purchased: 0, sortNumber:(coffeeByMonth[i].sortNumber + 1)});
          console.log("We added " + coffeeByMonth[i+1].sortNumber);
        }
    }


    let coffeeByMonthXY = coffeeByMonth.map( coffee => {return {x:coffee.sortNumber, y:coffee.purchased}});

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
