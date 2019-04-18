import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Containers / Components
import Header from './components/header';
import Home from './components/home';
import Users from './containers/users';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path='/' component={Header}/>
        <div className='App-body'>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/users' exact component={Users}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
