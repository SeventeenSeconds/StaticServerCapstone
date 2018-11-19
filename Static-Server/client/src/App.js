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
        this.state = {userAuthenticated: true, loginMode: true};

        this.switchSubmit = this.switchSubmit.bind(this);
        this.setUserAuthenticatedState = this.setUserAuthenticatedState.bind(this);
        this.logout = this.logout.bind(this);
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

    logout = () => {
        console.log("Logout has been pressed.");
        this.setState({userAuthenticated: false});
    }

    setUserAuthenticatedState = () => {
        this.setState({userAuthenticated: true});
    }

    render() {
        // state - user is logged in - change view to projects
        let page, submitOption;
        if (this.state.userAuthenticated) {
            page = <ProjectPage/>;
            submitOption = "Logout";
            // need to get an add project bar?
        } else {
            if (this.state.loginMode) {
                submitOption = "New user? Register!";
                page = <UserLoginForm setUserAuth={this.setUserAuthenticatedState}/>;
            } else {
                submitOption = "Already a user? Login!";
                page = <UserRegisterForm setUserAuth={this.setUserAuthenticatedState}/>;
            }

        }


        return (

            <div className="App">
                <AppBar postition="static">
                    <Toolbar color="grey">
                        <Button onClick={this.switchSubmit}>{submitOption}</Button>

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
