import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import Input from './input.js';
import Edit from './edit.js';
import List from './list.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Output from './output.js';

import {Route, Link, withRouter} from 'react-router-dom';


class Admin extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }


    render() {

      const { isAuthenticated } = this.props.auth;

      return (
        <div className="bigPadding">
              {
                !isAuthenticated() && (
                    <Button
                      id="qsLoginBtn"
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </Button>
                  )
              }
              {
                isAuthenticated() && (
                    <Button
                      id="qsLogoutBtn"
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                    </Button>
                  )
              }

            <Tabs>
              <TabList>
                <Tab><h3>Add a coffee</h3></Tab>
                <Tab><h3>See all entries</h3></Tab>
                <Tab><h3>Edit an entry</h3></Tab>
              </TabList>

              <TabPanel>
                <Input data={this.props.data}/>
              </TabPanel>
              <TabPanel>
                <List data={this.props.data}/>
              </TabPanel>
              <TabPanel>
                <Edit data={this.props.data}/>
              </TabPanel>
            </Tabs>

        </div>
      );

    }
  }

export default withRouter(Admin);
