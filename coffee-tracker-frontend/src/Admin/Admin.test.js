import React from "react";
import ReactDOM from "react-dom";
import Admin from "./Admin";
import testData from "../testdata.json";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Router><Admin data={testData}/></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
	const tree = renderer
		.create(<Router><Admin data={testData}/></Router>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});