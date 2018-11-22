import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App'
import Login from './components/Login';
import Register from './components/Register';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <main>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/index" component={App} />
                        <Route path="/register" component={Register} />
                    </Switch>
                    <Redirect to="/login" from="/" />
                </main>
            </div>
        </BrowserRouter>

    );
}