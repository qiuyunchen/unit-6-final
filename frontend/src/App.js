import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Containers / Components
import AddNewShow from './containers/add-new-show';
import Header from './components/header';
import Home from './components/home';
import ShowProfile from './containers/show-profile';
import Shows from './containers/shows';
import UserProfile from './containers/user-profile';
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
            <Route path='/user/post' exact component={AddNewShow}/>
            <Route path='/user/:id' exact component={UserProfile}/>
            <Route path='/shows' exact component={Shows}/>
            <Route path='/show/:id' exact component={ShowProfile}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
