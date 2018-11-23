import { Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel, Typography } from '@material-ui/core';
import * as React from "react";

interface IState {
    editing: boolean,
    error: boolean,
    loading: boolean,
}

export default class TodoEditor extends React.Component<{ doneEdit: any, authToken: any, item: any }, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            editing: false,
            error: false,
            loading: false,
        }
        this.editItem = this.editItem.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
    }

    public render() {
        const someDate = new Date(this.props.item.dueDate);
        someDate.setDate(someDate.getDate());
        someDate.setHours(someDate.getHours() + 13);
        const date = someDate.toISOString().substr(0, 10);
        return (
            <div>
                <Typography gutterBottom={true} align="center" variant="headline" component="h2">Edit Task</Typography>
                <form onSubmitCapture={this.editItem}>
                    <div>
                        <FormControl>
                            <InputLabel>Due Date</InputLabel>
                            <Input id="theDate1" fullWidth={true} name="due" required={true} type='date' defaultValue={date} />
                        </FormControl>

                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <FormControl>
                            <InputLabel>Task</InputLabel>
                            <Input fullWidth={true} name="task" required={true} autoFocus={true} type="text" defaultValue={this.props.item.task} />
                        </FormControl>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <FormControlLabel control={<Checkbox id="complete" defaultChecked={this.props.item.complete} />} label="Complete?" labelPlacement="start" />
                    </div>
                    <div style={{ marginTop: "10px", width: "100%" }}>
                        <FormControl style={{ width: "100%" }}>
                            <Button variant="contained" color="primary" type="submit" fullWidth={true} disabled={this.state.loading}>Edit</Button>
                        </FormControl>
                    </div>
                </form>
                <div style={{ marginTop: "10px", width: "100%" }}>
                    <Button color="primary" fullWidth={true} onClick={this.doneEdit}>Go Back</Button>
                </div>
                <div style={{ marginTop: "10px", width: "100%" }}>
                    <div style={{ marginTop: "10px", width: "100%" }}>
                        {this.state.error ? <Typography align="center">An Error Occured. Please Try Again.</Typography> : ""}
                    </div>
                </div>
            </div>
        );
    }

    public doneEdit() {
        this.props.doneEdit();
    }

    public editItem(event: any) {
        event.preventDefault();
        this.setState({ error: false, loading: true })
        fetch("https://socialworkapi3.azurewebsites.net/api/todoes/" + this.props.item.id, {
            body: JSON.stringify({ id: this.props.item.id, task: event.target.task.value, dueDate: event.target.due.value, complete: event.target.complete.checked }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.props.authToken
            },
            method: 'PUT'
        }).then((response: any) => {
            if (!response.ok) {
                this.setState({ error: true, loading: false });
            } else if (response.ok) {
                this.setState({ error: false, loading: false });
                this.props.doneEdit();
            }
        });
    }
}