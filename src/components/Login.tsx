import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import * as React from "react";
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

interface IState {
    error: boolean,
    loading: boolean,
    login: boolean,
    register: boolean,
    registered: boolean,
}

export default class Login extends React.Component<{ login: any }, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            login: false,
            register: false,
            registered: false,
        }
        this.setRegister = this.setRegister.bind(this);
        this.unsetRegister = this.unsetRegister.bind(this);
        this.setRegistered = this.setRegistered.bind(this);
        this.setError = this.setError.bind(this);
        this.unsetError = this.unsetError.bind(this);
    }

    public render() {
        return (
            <div style={{ backgroundColor: '#eff2f7' }}>
                <Grid container={true} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Grid item={true} md={6}>
                        <Card>
                            <CardContent>
                                {!this.state.register || this.state.registered ? <LoginContent beginRegister={this.setRegister} error={this.setError} unsetError={this.unsetError} setAuthToken={this.props.login} /> :
                                    <RegisterContent login={this.unsetRegister} registerComplete={this.setRegistered} error={this.setError} unsetError={this.unsetError} />}

                                {this.state.error ?
                                    <div style={{ marginTop: "10px", width: "100%" }}>
                                        <Typography align="center">Error, Try Again.</Typography>
                                    </div> :
                                    ""}

                                {this.state.registered ?
                                    <div style={{ marginTop: "10px", width: "100%" }}>
                                        <Typography align="center">Successfully Registered!</Typography>
                                    </div> :
                                    ""}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }

    public setRegister() {
        this.setState({ error: false, register: true });
    }

    public unsetRegister() {
        this.setState({ error: false, register: false });
    }

    public setRegistered() {
        this.setState({ registered: true });
    }

    public setError() {
        this.setState({ error: true });
    }

    public unsetError() {
        this.setState({ error: false });
    }
}