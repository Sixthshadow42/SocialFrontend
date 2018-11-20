import {
    Button, Card, CardContent,
    FormControl, Grid, Input, InputLabel, Typography
} from '@material-ui/core';
import * as React from "react";
import { Redirect } from 'react-router-dom'

interface IState {
    error: boolean,
    loading: boolean,
    login: boolean,
    register: boolean
}

export default class Login extends React.Component<{ location: any }, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: false,
            loading: false,
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
                                            <Input name="username" required={true} autoFocus={true} />
                                        </FormControl>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <FormControl>
                                            <InputLabel>Password</InputLabel>
                                            <Input name="password" required={true} type="password" />
                                        </FormControl>
                                    </div>
                                    <div style={{ marginTop: "10px", width: "100%" }}>
                                        <FormControl style={{ width: "100%" }}>
                                            <Button variant="contained" color="primary" type="submit" fullWidth={true} disabled={this.state.loading}>Log In</Button>
                                        </FormControl>
                                    </div>
                                </form>
                                <div style={{ marginTop: "10px", width: "100%" }}>
                                    <Button color="primary" fullWidth={true} onClick={this.setRegister}>Register</Button>
                                </div>
                                {this.checkError()}
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

    public checkError() {
        if (this.state.error){
            return <div style={{ marginTop: "10px", width: "100%" }}>
                <Typography align="center">Error, Try Again.</Typography>
            </div>
        }

        return "";
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
        this.setState({loading: true});
        fetch("https://socialworkapi.azurewebsites.net/api/users/login", {
            body: JSON.stringify({username: event.target.username.value, password: event.target.password.value}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response: any) => {
            if (!response.ok) {
                this.setState({error: true, loading: false});
            } else if (response.ok) {
                this.setState({login: true});
            }
        });
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