import React, { Component } from 'react';
import './App.css';
import ProductDetails from './components/ProductDetails.js';
import LoginPage from './components/LoginPage.js';
import ProductsList from './components/ProductsList.js';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/" render={ () => <Redirect to="/products" /> } />
          <Route exact path="/login" component={LoginPage} />
        </div>
      </Router>
    )
  }
}

export default App;
