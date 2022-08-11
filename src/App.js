import './App.css';
import React from 'react';
import Logo  from './Assets/logo.jpg';
import { Equipment } from './Components/Equipment';
import { Trainer } from './Components/Trainer';
import { Navigation } from './Components/Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <img src={Logo} alt="logo" className="logo"/>
      <h3 className="m-3 d-flex justify-content-center">
        Body Image - Gym Management System
      </h3>
      <Navigation />
      <Switch>
        <Route exact path="/equipment" component={Equipment} />
        <Route exact path="/trainer" component={Trainer} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;