import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import testData from '../testdata.json';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<List data={testData}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
    const tree = renderer
      .create(<List data={testData}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sorts the user added most recently to the top', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List data={testData}/>, div);
    expect(div.querySelector("td").textContent).toBe("6")
  });