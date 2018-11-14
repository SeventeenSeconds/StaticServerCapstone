import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

var crypto = require("crypto-js");

class UserLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailErrorMessage: "",
            passwordErrorMessage: "",
            emailValue: "",
            passwordValue: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.test = this.test.bind(this);
    }

    decrypt = password => {
        var bytes = crypto.AES.decrypt(password.toString(), 'bikes 666');
        var plaintext = bytes.toString(crypto.enc.Utf8);
        return plaintext;
    }

    test = () => {
        console.log(this.props.name);
    }


    handleLogin = async event => {
        event.preventDefault();
        // var string = this.decrypt(this.refs.password.value);
        console.log("Attempting to login with " + this.state.emailValue + " and " + this.state.passwordValue);
        if (this.state.emailValue !== null && this.state.emailValue !== "") {
            // check email
            console.log("valid email");
            if (this.state.passwordValue !== null && this.state.passwordValue.length >= 4) {
                console.log("Valid password");
                axios.post('/auth/login', {
                    email: this.state.emailValue,
                    password: this.state.passwordValue
                }).then(function (response) {
                    console.log("Yay! User logged in");
                    console.log(response.data.user.email);
                    // change page to log in their projects
                    // console.log(this.props.name);
                }).catch(function (error) {
                    // check error and parse body to respond to the user correctly with bad login
                    console.log("Login post had error");
                    console.log(error)
                });
                //TODO: should I only do this if I don't get an error? Depends on the type of error too?
                //TODO: should I set the session here then? And then keep the user authenticated? IDK UGH
                this.props.setUserAuth();
            } else {
                console.log(this.state.passwordValue);
                console.log("Invalid password");
                // password is not sufficient - inform user
            }
        } else {
            this.setState({emailErrorMessage: "Email is required"});
        }

    }

    setEmail = value => {
        console.log('attempting to change email value');
        this.setState({emailValue: value.currentTarget.value});
    }

    setPassword = value => {
        console.log('attempting to change password value');
        this.setState({passwordValue: value.currentTarget.value});
    }

    render() {

        return (

            <form class="form">
                <table class="table">
                    <tr>
                        <TextField
                            required
                            label="Email"
                            margin="normal"
                            onChange={this.setEmail}
                            helperText={this.state.emailErrorMessage}
                        />
                    </tr>
                    <tr>
                        <TextField
                            required
                            label="Password"
                            margin="normal"
                            onChange={this.setPassword}
                            helperText={this.state.passwordErrorMessage}
                        />
                    </tr>
                    <tr>
                        <Button type="button" onClick={this.handleLogin}>Login
                            <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                        </Button>
                    </tr>
                </table>
            </form>


        );
    }
}

export default UserLoginForm;