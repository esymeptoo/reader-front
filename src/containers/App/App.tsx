import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Test from '../../pages/Test/test';
import Main from '../../pages/Main';
import createHistory from 'history/createHashHistory';

const history = createHistory();

export default class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/app/test" render={ () => <Test/> }/>
                    <Route path="/app/main" render={ () => <Main/> }/>
                    <Redirect path="/app"  to="/app/main"/>
                </Switch>
            </ConnectedRouter>
        )
    }
}