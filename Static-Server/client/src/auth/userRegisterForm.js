import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
            usernameErrorMessage: "",
            allEmails: [],
            allUsernames: []
        };

        this.handleRegistration = this.handleRegistration.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
    }

    componentDidMount() {
        console.log('component did mount');
        // make call to db to get all usernames and all emails sent back
        axios.get('/auth/getUsernames')
            .then((response) => {
                console.log(response.data.emails);
                this.setState({allEmails: response.data.emails});
                this.setState({allUsernames: response.data.usernames});
            })
            .catch((error) => {
                //TODO: respond to user that the data couldn't be pulled for validation?
                //TODO: it's actually a validation error on my servers end - how do I tell the user?
            });
        //TODO: plus if it fails, the setting is outside the catch - how do i deal with this?

    }

    handleRegistration = async event => {
        event.preventDefault();

        if (this.state.validEmail && this.state.validUsername && this.state.validPassword) {
            axios.post('/auth/register', {
                email: this.state.emailValue,
                password: this.state.passwordValue,
                username: this.state.usernameValue
            }).then((response) => {
                console.log(response);
                this.props.setUserAuth(true);
                this.props.setEmail(this.state.emailValue);
            }).catch((error) => {
                console.log(error);
                this.setState({usernameErrorMessage: "Your account could not be registered"});
            });
        }
    }

    validateEmail = value => {
        this.setState({emailValue: value.currentTarget.value.trim()});

        let validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value.currentTarget.value);
        if (this.state.emailValue !== null && this.state.emailValue !== "" && validEmail) {
            if (this.state.allEmails.includes(value.currentTarget.value)) {
                this.setState({validEmail: false, emailErrorMessage: "Email is already registered."});
            } else {
                this.setState({validEmail: true, emailErrorMessage: "", emailValue: value.currentTarget.value});
            }
        } else {
            this.setState({validEmail: false, emailErrorMessage: "Invalid email address"});
        }
    }

    validatePassword = value => {
        this.setState({passwordValue: value.currentTarget.value});

        if (value.currentTarget.value === "") {
            this.setState({validPassword: false, passwordErrorMessage: "You must enter a password"});
        } else if (value.currentTarget.value !== this.state.confirmPasswordValue) {
            this.setState({validPassword: false, confirmPasswordErrorMessage: "Your passwords do not match"});
        } else {
            this.setState({validPassword: true, confirmPasswordErrorMessage: ""});
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
        this.setState({usernameValue: value.currentTarget.value});

        if (this.state.allUsernames.includes(value.currentTarget.value)) {
            this.setState({validUsername: false, usernameErrorMessage: "Username is already registered."});
        } else if (value.currentTarget.value === "") {
            this.setState({validUsername: false, usernameErrorMessage: "You must enter a username"})
        } else {
            this.setState({validUsername: true, usernameErrorMessage: "", usernameValue: value.currentTarget.value});
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