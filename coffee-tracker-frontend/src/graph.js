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
          months.purchased++;
        }else{
          coffeeByMonth.push({monthOpened: monthofDate.getMonth(),
                              yearOpened: monthofDate.getYear(),
                              purchased: 1,
                              sortNumber: (12*monthofDate.getYear())+(monthofDate.getMonth()),
                              label: monthofDate.setDate(1)
                            });
        }
      }
    })

    coffeeByMonth.sort(function (a, b){
      return a.sortNumber - b.sortNumber;
    })

    var monthofDate = new Date(coffeeByMonth[0].label);

    coffeeByMonth.unshift({monthOpened: (coffeeByMonth[0].monthOpened - 1),
                          yearOpened: coffeeByMonth[0].yearOpened,
                          purchased: 0,
                          sortNumber: (coffeeByMonth[0].sortNumber - 1),
                          label: monthofDate.setMonth(coffeeByMonth[0].monthOpened - 1)
                        });
    var i;
    for (i=0; i<(coffeeByMonth.length-1); i++){
      //if a month is missing, insert an entry for that month with no purchases
      if (coffeeByMonth[i].sortNumber == coffeeByMonth[i+1].sortNumber - 1){
      }else{
        var monthofDate = new Date(coffeeByMonth[i].label);

        coffeeByMonth.splice(i+1, 0, {monthOpened:(coffeeByMonth[i].monthOpened + 1),
                                      yearOpened:coffeeByMonth[i].yearOpened,
                                      purchased: 0,
                                      sortNumber:(coffeeByMonth[i].sortNumber + 1),
                                      label:monthofDate.setMonth(coffeeByMonth[i].monthOpened +1)
                                    });
      }
    }

    let coffeeByMonthXY = coffeeByMonth.map( coffee => {return {x:coffee.label, y:coffee.purchased}});

    console.log(coffeeByMonth);
    console.log(coffeeByMonthXY);

    return (

      <div className="bigPadding">
        <ul>
          {coffeeByMonth.length <= 0
            ? "NO DB ENTRIES YET"
            : coffeeByMonth.map(months => (
                <div key={months.monthOpened}>
                  <p><strong><Moment parse="M" format="MMMM">{months.monthOpened + 1}</Moment>/<Moment parse="YYYY" format="YYYY">{months.yearOpened + 1900}</Moment></strong> : {months.purchased}</p>
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
          <XAxis xType={"time"} tickLabelAngle={-30} title="Month opened" tickTotal={5} />
          <YAxis title="Number of packs opened"/>
        </XYPlot>

      </div>

    );
  }
}


export default Graph;
