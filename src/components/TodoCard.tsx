import { Button, Card, CardContent, Checkbox, Grid, Typography } from '@material-ui/core';
import * as React from "react";
import Modal from 'react-responsive-modal';
import TodoEditor from './TodoEditor';

interface IState {
    editing: boolean,
    error: boolean,
    loading: boolean,
}

export default class TodoCard extends React.Component<{ todoItem: any, authToken: any, doneDelete: any }, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            editing: false,
            error: false,
            loading: false,
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.beginEdit = this.beginEdit.bind(this);
        this.editItem = this.editItem.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
    }

    public render() {
        const someDate = new Date(this.props.todoItem.dueDate);
        someDate.setDate(someDate.getDate());
        someDate.setHours(someDate.getHours() + 13);
        const date = someDate.toISOString().substr(0, 10);
        return (
            <Grid item={true} xs={10} sm={8} md={4} lg={3}>
                <Modal open={this.state.editing} showCloseIcon={false} center={true} onClose={this.doneEdit}>
                    <TodoEditor doneEdit={this.doneEdit} authToken={this.props.authToken} item={this.props.todoItem} />
                </Modal>
                <Card style={{ height: 300, overflow: 'auto' }}>
                    <CardContent>
                        <Grid container={true}>
                            <Grid item={true} xs={12} style={{ marginLeft: "20px" }}>
                                <Typography gutterBottom={true} variant="subheading" component="h2">
                                    Task
                                </Typography>
                            </Grid>
                            <Grid item={true} xs={12} style={{ marginLeft: "20px" }}>
                                <Typography gutterBottom={true} variant="body1">
                                    {this.props.todoItem.task}
                                </Typography>
                            </Grid>
                            <Grid item={true} xs={12} style={{ marginTop: "10px", marginLeft: "20px" }}>
                                <Typography gutterBottom={true} variant="subheading" component="h2">
                                    Due
                                </Typography>
                            </Grid>
                            <Grid item={true} xs={12} style={{ marginLeft: "20px" }}>
                                <Typography gutterBottom={true} variant="body1">
                                    {date}
                                </Typography>
                            </Grid>
                            <Grid item={true} xs={6} style={{ marginTop: "10px", marginLeft: "20px" }}>
                                <Typography gutterBottom={true} variant="subheading" component="h2">
                                    Complete
                                </Typography>
                            </Grid>
                            <Grid item={true} xs={4} style={{ marginLeft: "20px" }}>
                                <Checkbox disabled={true} checked={this.props.todoItem.complete} />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <Button variant="contained" color="primary" fullWidth={true} onClick={this.editItem} disabled={this.state.loading}>
                                    Edit
                                </Button>

                            </Grid>
                            <Grid item={true} xs={12} style={{ marginTop: "10px" }}>
                                <Button fullWidth={true} variant="contained" color="secondary" style={this.state.loading ? {} : { backgroundColor: "red" }} onClick={this.deleteItem} disabled={this.state.loading} >
                                    Delete
                                </Button>
                            </Grid>
                            <Grid item={true} xs={12} style={{ marginTop: "10px" }}>
                                {this.state.error ? <Typography align="center">Error, Try Again.</Typography> : ""}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    public beginEdit() {
        this.setState({ editing: true });
    }

    public doneEdit() {
        this.setState({ editing: false });
        this.props.doneDelete();
    }

    public editItem() {
        this.setState({ error: false, loading: true })
        this.beginEdit();
    }

    public deleteItem() {
        this.setState({ error: false, loading: true })
        fetch("https://socialworkapi3.azurewebsites.net/api/todoes/" + this.props.todoItem.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.props.authToken
            },
            method: 'DELETE'
        }).then((response: any) => {
            if (!response.ok) {
                this.setState({ error: true, loading: false });
            } else if (response.ok) {
                this.setState({ error: false, loading: false });
                this.props.doneDelete();
            }
        });
    }

    
}