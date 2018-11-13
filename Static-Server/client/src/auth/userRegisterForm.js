import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

var crypto = require("crypto-js");

class UserRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validEmail: false,
            validPassword: false,
            validUsername: false,
            emailValue: "",
            passwordValue: "",
            confirmPasswordValue: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
            usernameErrorMessage: ""
        };

        this.handleRegistration = this.handleRegistration.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
    }

    encriptPassword = password => {
        var encriptedPassword = crypto.AES.encrypt(password, 'bikes 666');
        return encriptedPassword.toString();
    }

    handleRegistration(event) {
        event.preventDefault();
        var pass = this.encriptPassword(this.refs.password.value);
        console.log(pass);
        // check that current auth doesn't exist

        // check that the username isn't taken
        // change the username message to "That username is already taken, please enter another"
        // clear the textbox

        // double check that both passwords match
    }

    validateEmail = value => {
        this.setState({emailValue: value.currentTarget.value});
        let validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value.currentTarget.value);
        if (validEmail) {
            this.setState({validateEmail: true, emailErrorMessage: ""});
        } else {
            this.setState({validateEmail: true, emailErrorMessage: "Invalid email address"});
        }
    }

    validatePassword = value => {
        this.setState({passwordValue: value.currentTarget.value});
        if (value.currentTarget.value !== this.state.confirmPasswordValue) {
            this.setState({validPassword: false, confirmPasswordErrorMessage: "Your passwords do not match"});
        } else {
            console.log("passwords matched");
            this.setState({validPassword: true, confirmPasswordErrorMessage: ""});
        }

        if (value.currentTarget.value.length >= 4) {
            this.setState({passwordErrorMessage: ""});
        } else {
            this.setState({validPassword: false, passwordErrorMessage: "Your password must be 4 characters"});
        }
    }

    confirmPassword = value => {
        this.setState({confirmPasswordValue: value.currentTarget.value});
        if (value.currentTarget.value === this.state.passwordValue) {
            this.setState({validPassword: true, confirmPasswordErrorMessage: ""});
        } else {
            this.setState({validPassword: false, confirmPasswordErrorMessage: "Your passwords do not match"});
        }
    }

    validateUsername = value => {
        if (value.currentTarget.value.length > 0) {
            this.setState({usernameErrorMessage: ""});
        } else {
            this.setState({usernameErrorMessage: "You must enter a username"});
        }
    }

    render() {


        return (
            <form>
                <table class="table">
                    <tr>
                        <TextField
                            required
                            label="Email"
                            helperText={this.state.emailErrorMessage}
                            placeholder="Email"
                            margin="normal"
                            value={this.state.emailValue}
                            onChange={this.validateEmail}
                        />
                    </tr>
                    <tr>
                        <TextField
                            required
                            label="Password"
                            helperText={this.state.passwordErrorMessage}
                            placeholder="Password"
                            margin="normal"
                            value={this.state.passwordValue}
                            onChange={this.validatePassword}
                        />
                    </tr>
                    <tr>
                        <TextField
                            required
                            label="Confirm Password"
                            helperText={this.state.confirmPasswordErrorMessage}
                            placeholder="Confirm Password"
                            margin="normal"
                            value={this.state.confirmPassword}
                            onChange={this.confirmPassword}
                        />
                    </tr>
                    <tr>
                        <TextField
                            required
                            label="Username"
                            helperText={this.state.usernameErrorMessage}
                            placeholder="Username"
                            margin="normal"
                            value={this.state.username}
                            onChange={this.validateUsername}
                        />

                    </tr>
                    <Button
                        type="button" onClick={this.handleRegistration}>Register!
                    </Button>
                </table>


            </form>
        );
    }
}

export default UserRegisterForm;