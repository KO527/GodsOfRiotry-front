import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth/auth';
              
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !auth.isAuthenticated() && localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)