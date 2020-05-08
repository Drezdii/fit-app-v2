import React from 'react';
import { Route } from 'react-router-dom';
import { isTokenValid } from './TokenValidator';
import { Splashscreen } from '../Splashscreen';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isTokenValid(localStorage.getItem('token')) === true
            ? <Component {...props} />
            : <Splashscreen />
    )} />
);
