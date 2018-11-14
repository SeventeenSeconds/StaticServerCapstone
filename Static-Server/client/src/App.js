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
        this.state = {userAuthenticated: true, login: true};

        this.switchSubmit = this.switchSubmit.bind(this);
        this.setUserAuthenticatedState = this.setUserAuthenticatedState.bind(this);
    }

    switchSubmit(event) {
        event.preventDefault();
        if (this.state.login) {
            this.setState({login: false});
        } else {
            this.setState({login: true});
        }
    }

    setUserAuthenticatedState = () => {
        console.log("user auth state changed");
        this.setState({userAuthenticated: true});
    }

    render() {
        // state - user is logged in - change view to projects
        let page, submitOption;
        if (this.state.userAuthenticated) {
            page = <ProjectPage/>;
            // maybe set the menu so they can edit page??? IDK?
        } else {
            if (this.state.userAuthenticated) {
                submitOption = "Logout";
            } else {
                if (this.state.login) {
                    submitOption = "New user? Register!";
                    page = <UserLoginForm setUserAuth={this.setUserAuthenticatedState}/>;
                } else {
                    submitOption = "Already a user? Login!";
                    page = <UserRegisterForm/>;
                }
            }

        }


        return (

            <div className="App">
                <AppBar postition="static">
                    <Toolbar>
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
