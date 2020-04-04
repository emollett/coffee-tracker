import React, { Component } from 'react';
import '../App.css';
class Coffeemug extends Component {

  render() {
    var coffeeMugs = [];
    for(var i=0; i<this.props.purchased; i++){
      coffeeMugs.push("mug" + i);
    }

    return (
      <ul className="coffeeMug">
        {coffeeMugs.map(purchased => (
                <img src="./coffee.ico" alt="icon of a coffee mug" width="50" height="50" key={this.props.name + purchased}></img>
            ))}
      </ul>

    );
  }
}


export default Coffeemug;
