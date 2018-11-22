import { AppBar, Grid, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import * as React from "react";
import TodoCard from './TodoCard';

interface IState {
    error: boolean,
    todoItems: any
}

export default class TodoPage extends React.Component<{ authToken: any }, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            error: false,
            todoItems: {}
        }
    }

    public componentDidMount() {
        this.getTodoItems();
    }

    public render() {
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" style={{color: "white"}}>
                        WorkTodo
                        </Typography>
                        <div style={{flexGrow: 1}} />
                        <div style={{display: "flex"}}>
                            <IconButton>
                                    <Icon className={"fas fa-plus-circle"} style={{color: "white"}}/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid container={true} justify={'center'}>
                    <Grid item={true} xs={12}>
                        <Grid container={true} spacing={40}>
                            <TodoCard todoItem="" />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }

    public getTodoItems() {
        fetch("https://socialworkapi3.azurewebsites.net/api/todoes", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.props.authToken
            },
            method: 'GET'
        }).then((response: any) => {
            if (response.ok) {
                this.setState({ error: false });
                response.json().then((body: any) => {
                    body.forEach((element: any, index: any) => {
                        this.setState(prevState => ({
                            todoItems: [...prevState.todoItems, { 'index': index, 'todoItem': element }]
                        }))
                    });
                })
            } else {
                this.setState({ error: true });
            }
        });
    }
}
