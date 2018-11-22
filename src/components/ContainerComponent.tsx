import * as React from "react";
import Login from './Login';
import TodoPage from './TodoPage';

interface IState{
    authToken: string,
    loggedIn: boolean,
}

export default class ContainerComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            authToken: "",
            loggedIn: false,
        };
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    public render() {
        return (
            <div>
                {!this.state.loggedIn ? <Login login={this.setLoggedIn}/> : ""}
                {this.state.loggedIn ? <TodoPage authToken={this.state.authToken}/> : ""}
            </div>
        );
    }

    private setLoggedIn(token: string){
        this.setState({authToken: token, loggedIn: true});
    }
}