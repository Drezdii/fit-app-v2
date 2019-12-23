import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginComponent } from './Auth/LoginComponent'

function App() {
  return (
    <Router>
      <Route exact path="/login" component={LoginComponent} />
    </Router>
  );
}

export default App;
