import React, { Component } from 'react';
import './App.css';
import Input from './input.js';
import Edit from './edit.js';
import List from './list.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import io from 'socket.io-client';



class Admin extends Component {


    render() {


      return (
        <div>

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

export default Admin;
