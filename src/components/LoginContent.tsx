import {
    Button, FormControl,
    Input, InputLabel, Typography
} from '@material-ui/core';

import * as React from 'react';

interface IState {
    loading: boolean,
}

export default class LoginContent extends React.Component<{beginRegister: any, error: any, unsetError: any, setAuthToken: any}, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            loading: false,
        }
        this.authenticate = this.authenticate.bind(this);
    }

    public render() {
        return (
            <div>
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
                            <Input autoComplete="current-password" name="password" required={true} type="password" />
                        </FormControl>
                    </div>
                    <div style={{ marginTop: "10px", width: "100%" }}>
                        <FormControl style={{ width: "100%" }}>
                            <Button variant="contained" color="primary" type="submit" fullWidth={true} disabled={this.state.loading}>Log In</Button>
                        </FormControl>
                    </div>
                </form>
                <div style={{ marginTop: "10px", width: "100%" }}>
                    <Button color="primary" fullWidth={true} onClick={this.props.beginRegister}>Register</Button>
                </div>
            </div>
        );
    }

    public authenticate(event: any) {
        event.preventDefault();
        this.setState({ loading: true });
        fetch("https://worktodoapi.azurewebsites.net/api/users/login", {
            body: JSON.stringify({ username: event.target.username.value, password: event.target.password.value }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response: any) => {
            if (!response.ok) {
                this.setState({ loading: false });
                this.props.error();
            } else if (response.ok) {
                response.json().then((body: any) => {
                    this.props.setAuthToken(body.authToken);
                });
            }
        });
    }
}