import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App'
import Login from './components/Login';
import Register from './components/Register';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <main>
                    <Switch>
                        <Route exact={true} path="/login" component={Login} />
                        <Route exact={true} path="/index" component={App} />
                        <Route exact={true} path="/register" component={Register} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>

    );
}