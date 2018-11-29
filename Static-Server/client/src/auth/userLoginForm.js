import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
    }

    handleLogin = async event => {
        event.preventDefault();
        if (this.state.emailValue !== null && this.state.emailValue.trim() !== "") {
            if (this.state.passwordValue !== null && this.state.passwordValue.trim() !== "") {
                var validLogin = false;
                axios.post('/auth/loginMode', {
                    email: this.state.emailValue,
                    password: this.state.passwordValue
                }).then((response) => {
                    this.props.setUserAuth(true);
                    this.props.setEmail(response.data.user.email);
                    var p = [];
                    response.data.user.projects.forEach(project => {
                        p.push(project);
                    });
                    this.props.setProjects(p);
                    // this.props.setProjects(response.data.user.projects);
                    //TODO: get projects from return and pass as props to project page
                    // this.props.setProjects(response.projects);
                    console.log(response.data.user.projects);
                }).catch((error) => {
                    console.log(error);
                    this.setState({
                        emailErrorMessage: "Your email or password is incorrect.",
                        passwordErrorMessage: "Your email or password is incorrect."
                    });
                });
            } else {
                this.setState({passwordErrorMessage: "Password is required."});
            }
        } else {
            this.setState({emailErrorMessage: "Email is required"});
        }

    }

    setEmail = value => {
        this.setState({emailValue: value.currentTarget.value});
    }

    setPassword = value => {
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