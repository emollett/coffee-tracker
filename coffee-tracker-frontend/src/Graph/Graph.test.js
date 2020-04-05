import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph';
import testData from '../testdata.json';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Graph data={testData}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
    const tree = renderer
      .create(<Graph data={testData}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

it('should have the month before the first entry at the top', () => {
const div = document.createElement('div');
ReactDOM.render(<Graph data={testData}/>, div);
expect(div.querySelector("time").textContent).toBe("April")
});