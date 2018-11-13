import React, {Component} from 'react';
import UserAuthenticationPage from './auth/userAuthenticationPage';
import './App.css';


class App extends Component {

    state = {data: null}

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({data: res.express}))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/express');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {

        // state - user is logged in - change view to projects


        return (
            <div className="App">
                <UserAuthenticationPage/>
            </div>
        );
    }

}

export default App;
