import {
    Button, Card, CardContent,
    FormControl, Grid, Input, InputLabel, Typography
} from '@material-ui/core';
import * as React from "react";
import { Redirect } from 'react-router-dom'

interface IState {
    login: boolean,
    register: boolean
}

export default class Login extends React.Component<{ location: any }, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: false,
            register: false
        }
        this.authenticate = this.authenticate.bind(this);
        this.setRegister = this.setRegister.bind(this);
    }

    public render() {
        return (
            <div style={{ backgroundColor: '#eff2f7' }}>
                <Grid container={true} md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Grid item={true} md={6}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom={true} align="center" variant="headline" component="h2">Login</Typography>
                                <form onSubmitCapture={this.authenticate}>
                                    <div>
                                        <FormControl>
                                            <InputLabel>Username</InputLabel>
                                            <Input required={true} autoFocus={true} />
                                        </FormControl>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <FormControl>
                                            <InputLabel>Password</InputLabel>
                                            <Input required={true} type="password" />
                                        </FormControl>
                                    </div>
                                    <div style={{ marginTop: "10px", width: "100%" }}>
                                        <FormControl style={{ width: "100%" }}>
                                            <Button variant="contained" color="primary" type="submit" fullWidth={true}>Log In</Button>
                                        </FormControl>
                                    </div>
                                </form>
                                <div style={{ marginTop: "10px", width: "100%" }}>
                                    <Button color="primary" fullWidth={true} onClick={this.setRegister}>Register</Button>
                                </div>
                                {this.registerSuccess()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {this.register()}
                {this.login()}
            </div>
        );
    }

    public registerSuccess() {
        if (this.props.location != null) {
            if (this.props.location.state != null) {
                if (this.props.location.state.registered != null) {
                    if (this.props.location.state.registered === "true") {
                        return <div style={{ marginTop: "10px", width: "100%" }}>
                            <Typography align="center">Successfully Registered!</Typography>
                        </div>
                    }
                }
            }
        }
        return "";
    }

    public setRegister(event: any) {
        this.setState({ register: true });
    }

    public authenticate(event: any) {
        event.preventDefault();
        this.setState({ login: true });
    }

    public login() {
        if (this.state.login) {
            return <Redirect to="/index" />
        }
        return "";
    }

    public register() {
        if (this.state.register) {
            return <Redirect to="/register" />
        }
        return "";
    }
}