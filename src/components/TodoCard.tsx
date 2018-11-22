import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import * as React from "react";

export default class TodoCard extends React.Component<{todoItem: any}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Grid item={true} sm={10} md={4} lg={3}>
                <Card style={{ height: 300, overflow: 'auto' }}>
                    <CardContent>
                        Blah
                    </CardContent>
                    <CardActions>
                        <Button>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}