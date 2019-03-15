import React, { Component } from 'react';
import Admin from '../admin.js';
import '../App.css';

class Home extends Component {

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() && (
            <div>
              <h4 className="bigPadding">
                You are logged in!
              </h4>

              <Admin data={this.props.data } auth={this.props.auth} />
            </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4 className="bigPadding">
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
