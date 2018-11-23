import { AppBar, Avatar, Grid, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import * as React from "react";
import Modal from 'react-responsive-modal';
import Logo from '../logo.png'
import TodoCard from './TodoCard';
import TodoCreator from './TodoCreator';

interface IState {
    creating: boolean,
    error: boolean,
    todoItems: any
}

export default class TodoPage extends React.Component<{ authToken: any }, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            creating: false,
            error: false,
            todoItems: []
        }
        this.createTodo = this.createTodo.bind(this);
        this.doneCreateTodo = this.doneCreateTodo.bind(this);
    }

    public componentDidMount() {
        this.getTodoItems();
    }

    public render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ color: "white" }}>
                            WorkTodo
                        </Typography>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{alignContent: "center"}}>
                            <Avatar src={Logo} />
                        </div>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ display: "flex" }}>
                            <IconButton onClick={this.createTodo}>
                                <Icon className={"fas fa-plus-circle"} style={{ color: "white" }} />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid container={true} justify={'center'}>
                    <Grid item={true} xs={12}>
                        <Modal open={this.state.creating} showCloseIcon={false} center={true} onClose={this.doneCreateTodo}>
                            <TodoCreator doneCreating={this.doneCreateTodo} authToken={this.props.authToken} />
                        </Modal>
                        <Grid container={true} spacing={40} justify="center" style={{ marginTop: "20px" }}>
                            {this.createElements()}
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
                let itemArray: any[] = [];
                this.setState({ error: false, todoItems: {} });
                response.json().then((body: any) => {
                    body.forEach((element: any, index: any) => {
                        itemArray = [...itemArray, { 'index': index, 'todoItem': element }]
                    });
                    this.setState({ todoItems: itemArray });
                })
            } else {
                this.setState({ error: true });
            }
        });
    }

    public createTodo() {
        this.setState({ creating: true });
    }

    public doneCreateTodo() {
        this.setState({ creating: false });
        this.getTodoItems();
    }

    public createElements = () => {
        const itemArray: any = [];
        for (let i = 0; i < this.state.todoItems.length; i++) {
            itemArray.push(<TodoCard key={i} todoItem={this.state.todoItems[i].todoItem} authToken={this.props.authToken} doneDelete={this.doneCreateTodo} />)
        }
        return itemArray;
    }
}
