import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Components 
import App from './App';
import Players from './Players'
import Games from './Games'
import Teams from './Teams'
import Stats from './Stats'
import NotFound from './Error/NotFound'

// Styles 
import '../src/main.css'
import Header from './Utils/Header';


const routing = (
  <Router>
    
    <Header />

    <Switch>
      
      <Route
        exact path='/'
        component={App}
      />
      
      <Route
        exact path='/players'
        component={Players}
      />
      
      <Route
        exact path='/games'
        component={Games}
      />
      
      <Route
        exact path='/stats'
        component={Stats}
      />
      
      <Route
        exact path='/teams'
        component={Teams}
      />
      
      <Route
        path='*'
        component={NotFound}
      />

    </Switch>
  </Router>
);



ReactDOM.render(routing, document.getElementById('root'));