import React, { Component } from 'react';
import './App.css';
import './common/rem'
import Router from './router/index'
import routes from './router/yiji'

class App extends Component {
  render() {
    return (
      <div className="App">

          <Router routes={routes}></Router>

      </div>
    );
  }
}

export default App;
