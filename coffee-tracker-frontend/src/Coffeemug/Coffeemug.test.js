import React from "react";
import ReactDOM from "react-dom";
import Coffeemug from "./Coffeemug";

const fakeProps = {
	name: "Alice",
	purchased: 3
};

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Coffeemug {...fakeProps}/>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("creates the same number of images of coffee mugs as the number of coffees purchased", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Coffeemug {...fakeProps}/>, div);
	expect(div.querySelectorAll("img")).toHaveLength(3);
});