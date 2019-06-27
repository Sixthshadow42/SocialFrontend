import { Button, Checkbox, FormControl, FormControlLabel, Icon, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core';
import MediaStreamRecorder from 'msr';
import * as React from "react";

interface IState {
    editing: boolean,
    error: boolean,
    loading: boolean,
    talking: boolean,
}

export default class TodoEditor extends React.Component<{ doneEdit: any, authToken: any, item: any }, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            editing: false,
            error: false,
            loading: false,
            talking: false,
        }
        this.editItem = this.editItem.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
        this.voiceAddTasks = this.voiceAddTasks.bind(this)
        this.talking = this.talking.bind(this);
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
                            <InputLabel shrink={this.state.talking}>Task</InputLabel>
                            <Input id="task" fullWidth={true} name="task" required={true} onClick={this.talking} onFocus={this.talking} autoFocus={true} type="text" defaultValue={this.props.item.task} endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="Turn on text to speech" onClick={this.voiceAddTasks}>
                                        <Icon className={"fas fa-microphone"} style={{fontSize: "15px"}}/>
                                    </IconButton>
                                </InputAdornment>   
                            }/>
                        </FormControl>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <FormControlLabel control={<Checkbox id="complete" defaultChecked={this.props.item.complete} />} label="Complete?" labelPlacement="start" />
                    </div>
                    <div style={{ marginTop: "10px", width: "100%" }}>
                        <FormControl style={{ width: "100%" }}>
                            <Button variant="contained" color="primary" type="submit" fullWidth={true} disabled={this.state.loading}>Submit</Button>
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

    public talking(event: any){
        event.preventDefault();
        this.setState({talking: true})
    }

    public doneEdit() {
        this.props.doneEdit();
    }

    public editItem(event: any) {
        event.preventDefault();
        this.setState({ error: false, loading: true })
        fetch("https://worktodoapi.azurewebsites.net/api/todoes/" + this.props.item.id, {
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

    private voiceAddTasks() {
        this.setState({talking: true})
        const mediaConstraints = {
            audio: true
        };
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

        function onMediaError(e: any) {
            console.error('media error', e);
        }
    }

    private postAudio(blob: any) {
        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });

        // posting audio
        fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
            body: blob, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer' + accessToken,
                'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            const textBox = document.getElementById("task") as HTMLInputElement
            textBox.value = (res.DisplayText as string).slice(0, -1)
            console.log(res)
        }).catch((error) => {
            console.log("Error", error)
        });
    }
}