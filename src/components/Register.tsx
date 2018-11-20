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
    registered: string
}

export default class Login extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            login: false,
            registered: "false"
        }
        this.setLogin = this.setLogin.bind(this);
        this.register = this.register.bind(this);
    }

    public render() {
        return (
            <div style={{ backgroundColor: '#eff2f7' }}>
                <Grid container={true} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Grid item={true} md={6}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom={true} align="center" variant="headline" component="h2">Register</Typography>
                                <form onSubmitCapture={this.register}>
                                    <div>
                                        <FormControl>
                                            <InputLabel>Email Address</InputLabel>
                                            <Input name="emailAddress" required={true} autoFocus={true} type="email" />
                                        </FormControl>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <FormControl>
                                            <InputLabel>Username</InputLabel>
                                            <Input name="username" required={true} />
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
                                            <Button variant="contained" color="primary" type="submit" fullWidth={true} disabled={this.state.loading}>Register</Button>
                                        </FormControl>
                                    </div>
                                </form>
                                <div style={{ marginTop: "10px", width: "100%" }}>
                                    <Button color="primary" fullWidth={true} onClick={this.setLogin}>Go Back</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {this.login()}
            </div>
        );
    }

    public setLogin(event: any){
        this.setState({login: true});
    }

    public register(event: any) {
        event.preventDefault();
        this.setState({loading: true});
        fetch("https://socialworkapi.azurewebsites.net/api/users", {
            body: JSON.stringify({username: event.target.username.value, emailAddress: event.target.emailAddress.value, password: event.target.password.value}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response: any) => {
            if (!response.ok) {
                this.setState({error: true, loading: false, registered: "false"});
            } else if (response.ok) {
                this.setState({registered: "true"});
                this.setLogin(null);
            }
        });
    }

    public login() {
        if (this.state.login) {
            return <Redirect to={{pathname: "/login", state: {registered: this.state.registered}}} />
        }
        return "";
    }
}