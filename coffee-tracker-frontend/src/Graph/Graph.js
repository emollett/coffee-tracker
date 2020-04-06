/* eslint-disable no-empty */
import React, { Component } from "react";
import "../App.css";
import Moment from "react-moment";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, MarkSeries} from "react-vis";
import "react-vis/dist/style.css";


class Graph extends Component {


	render() {

		let coffeeByMonth = [];
		this.props.data.forEach( entry => {

			let dateOpened = new Date(entry.date);

			if (dateOpened.getYear() === 70 || dateOpened == "Invalid Date"){
			}else{

				let dates = coffeeByMonth.find(dates => {return dates.monthOpened === dateOpened.getMonth() && dates.yearOpened === dateOpened.getYear();});

				if (dates !== undefined) {
					dates.purchased++;
				}else{
					coffeeByMonth.push({
						monthOpened: dateOpened.getMonth(),
						yearOpened: dateOpened.getYear(),
						purchased: 1,
						sortNumber: (12*dateOpened.getYear())+(dateOpened.getMonth()),
						label: dateOpened.setDate(1)
					});
				}
			}
		});

		coffeeByMonth.sort(function (a, b){
			return a.sortNumber - b.sortNumber;
		});

		//inserts a month with 0 purchases right at the beginning to make the graph start from 0
		let dateOpened = new Date(coffeeByMonth[0].label);
		coffeeByMonth.unshift({
			monthOpened: (coffeeByMonth[0].monthOpened - 1),
			yearOpened: coffeeByMonth[0].yearOpened,
			purchased: 0,
			sortNumber: (coffeeByMonth[0].sortNumber - 1),
			label: dateOpened.setMonth(coffeeByMonth[0].monthOpened - 1)
		});
    
		//if a month is missing, insert an entry for that month with no purchases
		var i;
		for (i=0; i<(coffeeByMonth.length-1); i++){
			if (coffeeByMonth[i].sortNumber === coffeeByMonth[i+1].sortNumber - 1){
			}else{
				dateOpened = new Date(coffeeByMonth[i].label);
				coffeeByMonth.splice(i+1, 0, {
					monthOpened:((coffeeByMonth[i].monthOpened == 11) ? coffeeByMonth[i].monthOpened - 11 :  coffeeByMonth[i].monthOpened + 1),
					yearOpened:((coffeeByMonth[i].monthOpened == 11) ? coffeeByMonth[i].yearOpened + 1 : coffeeByMonth[i].yearOpened),
					purchased: 0,
					sortNumber:(coffeeByMonth[i].sortNumber + 1),
					label:dateOpened.setMonth(coffeeByMonth[i].monthOpened +1)
				});
			}
		}

		let coffeeByMonthXY = coffeeByMonth.map( coffee => {return {x:coffee.label, y:coffee.purchased};});


		return (

			<div className="bigPadding">
				<h2>Graph of how much coffee is being purchased each month</h2>
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

				<h3>Data from the graph</h3>
				<ul>
					{coffeeByMonth.length <= 0
						? "NO DB ENTRIES YET"
						: coffeeByMonth.map(dates => (
							<div key={dates.monthOpened}>
								<p><strong><Moment parse="M" format="MMMM">{dates.monthOpened + 1}</Moment>/<Moment parse="YYYY" format="YYYY">{dates.yearOpened + 1900}</Moment></strong> : {dates.purchased}</p>
							</div>
						))}
				</ul>

			</div>

		);
	}
}


export default Graph;
