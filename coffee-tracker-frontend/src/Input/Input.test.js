import React from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import testData from "../testdata.json";
import renderer from "react-test-renderer";
import { render, fireEvent, wait, getByTestId } from "@testing-library/react";

const state = {
	id: 0,
	message: "Nice coffee",
	name: "Eleanor",
	coffee: "Tesco's finest",
	datePurchased: null,
	date: null,
};

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Input data={testData}/>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
	const tree = renderer
		.create(<Input data={testData}/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

// it("submitting the form calls the function to put the data in the db", async () => {
// 	const { container } = render(<Input data={testData}/>);
// 	const coffee = container.querySelector("input[id=\"coffee\"]");
// 	const name = container.querySelector("input[id=\"name\"]");
// 	const datePurchased = container.querySelector("input[id=\"datePurchased\"]");
// 	const date = container.querySelector("input[id=\"dateOpened\"]");
// 	const message = container.querySelector("input[id=\"message\"]");
// 	const form = container.querySelector("form[id=\"new-coffee-form\"]");
// 	const putDataToDB = jest.fn();

// 	await wait(() => {
// 		fireEvent.change(coffee, {
// 			target: {
// 				value: "tesco"
// 			}
// 		});
// 	});
    
// 	await wait(() => {
// 		fireEvent.change(name, {
// 			target: {
// 				value: "Eleanor"
// 			}
// 		});
// 	});

// 	await wait(() => {
// 		fireEvent.change(datePurchased, {
// 			target: {
// 				value: null
// 			}
// 		});
// 	});
    
// 	await wait(() => {
// 		fireEvent.change(date, {
// 			target: {
// 				value: null
// 			}
// 		});
// 	});
    
// 	await wait(() => {
// 		fireEvent.change(message, {
// 			target: {
// 				value: null
// 			}
// 		});
// 	});

// 	await wait(() => {
// 		fireEvent.click(getByTestId(container, "submitCoffeeTest"));
// 	});

// 	expect(putDataToDB).toHaveBeenCalled();
// });