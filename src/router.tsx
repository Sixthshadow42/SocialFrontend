import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <main>
                    <Route path='/' component = {App} />
                    <Redirect from='*' to='/' />

                </main>
            </div>
        </BrowserRouter>

    );
}