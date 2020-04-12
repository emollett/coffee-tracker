import React, { Component } from "react";
import "../App.css";
import Input from "../Input/Input";
import Edit from "../edit.js";
import List from "../List/List";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { withRouter} from "react-router-dom";


class Admin extends Component {

	render() {

		return (
			<div className="bigPadding">

				<Tabs>
					<TabList>
						<Tab><h3>Add a coffee</h3></Tab>
						<Tab><h3>Edit an entry</h3></Tab>
					</TabList>

					<TabPanel>
						<Input data={this.props.data}/>
					</TabPanel>

					<TabPanel>
						<Edit data={this.props.data}/>
					</TabPanel>
				</Tabs>

				<List data={this.props.data}/>

			</div>
		);
	}
}

export default withRouter(Admin);
