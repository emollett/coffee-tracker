import React from 'react';
import ReactDOM from 'react-dom';
import Output from './Output';
import testData from '../testdata.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Output data={testData}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('sorts the user who has bought the most coffee to the top', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Output data={testData}/>, div);
    expect(div.querySelector("h2").textContent).toBe("Alice:")
  });

it('groups the purchases by purchaser', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Output data={testData}/>, div);
  expect(div.querySelectorAll("h2")).toHaveLength(3)
});