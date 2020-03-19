import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from './TokenValidator';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isTokenValid(localStorage.getItem('token')) === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);
