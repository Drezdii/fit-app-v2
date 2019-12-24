import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginComponent, RegisterComponent } from './Auth/LoginComponent'

function App() {
  return (
    <Router>
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/register" component={RegisterComponent} />
    </Router>
  );
}

export default App;
