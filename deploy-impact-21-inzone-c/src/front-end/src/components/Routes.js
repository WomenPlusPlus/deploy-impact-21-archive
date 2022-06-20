import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import StudentRoutes from './StudentRoutes';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import CoordinatorRoutes from './CoordinatorRoutes';

const createRoutes = () => (
    <Router>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path={"/signup"} component={SignUpPage} />
            <Route path={"/student"} component={StudentRoutes} />
            <Route path={"/coordinator"} component={CoordinatorRoutes} />
        </Switch>
    </Router>
);

export default createRoutes;