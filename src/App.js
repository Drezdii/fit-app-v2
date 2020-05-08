import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RegisterForm } from './Auth/RegisterForm';
import { MainContainer } from './Main/MainContainer';
import { PrivateRoute } from './core/PrivateRoute';

function App() {
  return (
    
      <Router>
        <PrivateRoute exact path="/" component={MainContainer} />
        <Route exact path="/register" component={RegisterForm} />
      </Router>
    
  );
}

export default App;
