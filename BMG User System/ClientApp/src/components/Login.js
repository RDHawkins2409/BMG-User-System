import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
    }

    handleChange = (event) => {
        const { target } = event;
        const { value } = target;
        const { name } = target;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Form className="form" onSubmit={(e) => this.props.loginCall(e, this.state.username, this.state.password)}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}