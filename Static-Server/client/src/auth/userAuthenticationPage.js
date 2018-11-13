import React, {Component} from 'react';
import UserLoginForm from "./userLoginForm";
import UserRegisterForm from "./userRegisterForm";
import './forms.css';
import Button from '@material-ui/core/Button';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', login: true};

        this.handleChange = this.handleChange.bind(this);
        this.switchSubmit = this.switchSubmit.bind(this);
    }

    switchSubmit(event) {
        event.preventDefault();
        if (this.state.login) {
            this.setState({login: false});
        } else {
            this.setState({login: true});
        }
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let userForm;
        let submitOption;

        if (this.state.login) {
            submitOption = "New user? Register!";
            userForm = <UserLoginForm/>;
        } else {
            submitOption = "Already a user? Login!";
            userForm = <UserRegisterForm/>;
        }

        return (
            <div class="form-holder">
                <div>Top Bar Menu</div>
                    {userForm}
                <Button onClick={this.switchSubmit}>{submitOption}</Button>
            </div>
        );
    }
}

export default UserPage;
