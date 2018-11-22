import {
    Button, FormControl,
    Input, InputLabel, Typography
} from '@material-ui/core';

import * as React from 'react';

interface IState {
    loading: boolean,
}

export default class RegisterContent extends React.Component<{ login: any, registerComplete: any, error: any, unsetError: any }, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            loading: false,
        }
        this.register = this.register.bind(this);
    }

    public render() {
        return (
            <div>
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
                    <Button color="primary" fullWidth={true} onClick={this.props.login}>Go Back</Button>
                </div>
            </div>
        );
    }

    public register(event: any) {
        event.preventDefault();
        this.setState({loading: true});
        this.props.unsetError();
        fetch("https://socialworkapi3.azurewebsites.net/api/users", {
            body: JSON.stringify({username: event.target.username.value, emailAddress: event.target.emailAddress.value, password: event.target.password.value}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response: any) => {
            if (!response.ok) {
                this.props.error();
                this.setState({loading: false});
            } else if (response.ok) {
                this.props.registerComplete();
            }
        });
    }
}