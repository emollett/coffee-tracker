import React, { Component } from "react";
import Admin from "../admin.js";
import "../App.css";
import { Button } from "react-bootstrap";

class Home extends Component {

	// login() {
	// 	this.props.auth.login();
	// }


	render() {
		// const { isAuthenticated } = this.props.auth;
		return (
			<div>
				{/* {
					isAuthenticated() && (
						<div>
							<p className="bigPadding">
                You are logged in!
							</p> */}

				<Admin data={this.props.data } auth={this.props.auth} />
				{/* </div>
					)
				}
				{
					!isAuthenticated() && (
						<p className="bigPadding">
                You are not logged in! Please{" "}
							<Button
								id="qsLoginBtn"
								href="#"
								className="btn-margin"
								onClick={this.login.bind(this)}
							>
                  Log In
							</Button>
							{" "}to continue.
						</p>
					)
				} */}
			</div>
		);
	}
}

export default Home;
