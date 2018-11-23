import {
    Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel, Typography
} from '@material-ui/core';

import * as React from 'react';

interface IState {
    error: boolean,
    loading: boolean,
    success: boolean
}

export default class TodoCreator extends React.Component<{ doneCreating: any, authToken: string }, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            error: false,
            loading: false,
            success: false
        }
        this.doneCreating = this.doneCreating.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    public render() {
        const someDate = new Date();
        someDate.setDate(someDate.getDate());
        someDate.setHours(someDate.getHours() + 13);
        const date = someDate.toISOString().substr(0, 10);
        return (
            <div>
                <Typography gutterBottom={true} align="center" variant="headline" component="h2">Create Task</Typography>
                <form onSubmitCapture={this.createTodo}>
                    <div>
                        <FormControl>
                            <InputLabel>Due Date</InputLabel>
                            <Input fullWidth={true} name="due" required={true} type='date' defaultValue={date} />
                        </FormControl>

                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <FormControl>
                            <InputLabel>Task</InputLabel>
                            <Input fullWidth={true} name="task" required={true} autoFocus={true} type="text" />
                        </FormControl>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <FormControlLabel control={<Checkbox id="complete" />} label="Complete?" labelPlacement="start" />
                    </div>
                    <div style={{ marginTop: "10px", width: "100%" }}>
                        <FormControl style={{ width: "100%" }}>
                            <Button variant="contained" color="primary" type="submit" fullWidth={true} disabled={this.state.loading}>Create</Button>
                        </FormControl>
                    </div>
                </form>
                <div style={{ marginTop: "10px", width: "100%" }}>
                    <Button color="primary" fullWidth={true} onClick={this.doneCreating}>Go Back</Button>
                </div>
                <div style={{ marginTop: "10px", width: "100%" }}>
                    <div style={{ marginTop: "10px", width: "100%" }}>
                        {this.state.success ? <Typography align="center">Successfully Created!</Typography> : ""}
                        {this.state.error ? <Typography align="center">An Error Occured. Please Try Again.</Typography> : ""}
                    </div>
                </div>
            </div>
        );
    }

    public createTodo(event: any) {
        event.preventDefault();
        this.setState({ error: false, loading: true });
        fetch("https://socialworkapi3.azurewebsites.net/api/todoes", {
            body: JSON.stringify({ task: event.target.task.value, dueDate: event.target.due.value, complete: event.target.complete.checked }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.props.authToken
            },
            method: 'POST'
        }).then((response: any) => {
            if (!response.ok) {
                this.setState({ error: true, loading: false, success: false });
            } else if (response.ok) {
                this.setState({ error: false, loading: false, success: true })
            }
        });
    }

    public doneCreating(event: any) {
        this.props.doneCreating();
    }
}