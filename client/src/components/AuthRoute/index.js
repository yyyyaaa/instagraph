import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../../lib/auth';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props => 
      checkAuth()
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/login" }} />
    }
  />
)

export default AuthRoute;