import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UserLoginForm from './auth/userLoginForm';
import UserRegisterForm from './auth/userRegisterForm';
import ProjectPage from './project/projectPage';
import Button from '@material-ui/core/Button';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAuthenticated: false,
            loginMode: true,
            userEmail: "",
            userProjects: [],

        };

        this.switchSubmit = this.switchSubmit.bind(this);
        this.setUserAuthenticatedState = this.setUserAuthenticatedState.bind(this);
        this.logout = this.logout.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setUserProjects = this.setUserProjects.bind(this);
    }

    switchSubmit(event) {
        event.preventDefault();
        if (this.state.userAuthenticated) {
            this.logout();
        } else {
            if (this.state.loginMode) {
                this.setState({loginMode: false});
            } else {
                this.setState({loginMode: true});
            }
        }
    }

    setUserProjects = projects => {
        projects.forEach(project => {
            console.log(project);
        });
        this.setState({userProjects: projects});
    }

    setEmail = email => {
        this.setState({userEmail: email});
    }

    logout = () => {
        this.setState({userAuthenticated: false, loginMode: true, userEmail: "", userProjects: []});
    }

    setUserAuthenticatedState = value => {
        this.setState({userAuthenticated: value});
    }

    style = {
        loginButton: {
            color: 'white',
        },
        toolbar: {
            background: 'black'
        }
    };

    render() {
        // state - user is logged in - change view to projects
        let page, submitOption;
        if (this.state.userAuthenticated) {
            page = <ProjectPage userEmail={this.state.userEmail} userProjects={this.state.userProjects} setProjects={p => this.setUserProjects(p)}/>;
            submitOption = "Logout";
            // need to get an add project bar?
        } else {
            if (this.state.loginMode) {
                submitOption = "New user? Register!";
                page = <UserLoginForm setProjects={p => this.setUserProjects(p)} setEmail={u => this.setEmail(u)} setUserAuth={state => this.setUserAuthenticatedState(state)}/>;
            } else {
                submitOption = "Already a user? Login!";
                page = <UserRegisterForm setEmail={u => this.setEmail(u)} setUserAuth={state => this.setUserAuthenticatedState(state)}/>;
            }

        }


        return (

            <div className="App" style={this.style.app}>
                <AppBar postition="static">
                    <Toolbar style={this.style.toolbar}>
                        <Button style={this.style.loginButton} onClick={this.switchSubmit}>{submitOption}</Button>
                    </Toolbar>
                </AppBar>
                <div class="form-holder">
                    {page}
                </div>
            </div>
        );
    }

}

export default App;
