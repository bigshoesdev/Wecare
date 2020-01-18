import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUser } from './helpers/authUtils';

// lazy load all the views
const Dashboard = React.lazy(() => import('./pages/dashboards/'));
const Users = React.lazy(() => import('./pages/users/'));
const AddUser = React.lazy(() => import('./pages/users/add'));
const UpdateAccount = React.lazy(() => import('./pages/users/updateAccount'));
const ChangePassword = React.lazy(() => import('./pages/users/changePassword'));
const Settings = React.lazy(() => import('./pages/settings/'));
const Clients = React.lazy(() => import('./pages/clients/'));
const AddClient = React.lazy(() => import('./pages/clients/add'));
const ViewClient = React.lazy(() => import('./pages/clients/view'));
const EditClient = React.lazy(() => import('./pages/clients/editClient'));
const EditPolicy = React.lazy(() => import('./pages/clients/editPolicy'));

// auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Logout = React.lazy(() => import('./pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('./pages/account/ForgetPassword'));
const Register = React.lazy(() => import('./pages/account/Register'));
const ConfirmAccount = React.lazy(() => import('./pages/account/Confirm'));

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    const isAuthTokenValid = isUserAuthenticated();
    if (!isAuthTokenValid) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    const loggedInUser = getLoggedInUser();
    // check if route is restricted by role
    if (roles && roles.indexOf(loggedInUser.role) === -1) {
      // role not authorised so redirect to home page
      return <Redirect to={{ pathname: '/' }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
)

const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  { path: '/logout', name: 'Logout', component: Logout, route: Route },
  { path: '/forget-password', name: 'Forget Password', component: ForgetPassword, route: Route },
  { path: '/register', name: 'Register', component: Register, route: Route },
  { path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route },

  // other pages
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/update-account', name: 'UpdateAccount', component: UpdateAccount, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/users', exact: true, name: 'Users', component: Users, route: PrivateRoute, roles: ['admin'] },
  { path: '/users/add', exact: true, name: 'AddUser', component: AddUser, route: PrivateRoute, roles: ['admin'] },
  { path: '/users/:id/update-account', exact: true, name: 'ChangePassword', component: ChangePassword, route: PrivateRoute, roles: ['admin'] },
  { path: '/settings', exact: true, name: 'Settings', component: Settings, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/clients', exact: true, name: 'Clients', component: Clients, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/clients/add', exact: true, name: 'AddClient', component: AddClient, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/clients/:id/view', exact: true, name: 'ViewClient', component: ViewClient, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/clients/:id/policy/:policyId/update', exact: true, name: 'EditPolicy', component: EditPolicy, route: PrivateRoute, roles: ['admin', 'staff'] },
  { path: '/clients/:id/edit', exact: true, name: 'EditPolicy', component: EditClient, route: PrivateRoute, roles: ['admin', 'staff'] },,
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute
  },

]

export { routes, PrivateRoute };
