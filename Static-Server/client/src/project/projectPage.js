import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddProjectCard from './addProjectCard';
import axios from 'axios';

class MainLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: "",
            servingCurrentProject: "",
            backgroundColor: "",
            projects: props.userProjects,
            file: ""
        };

        this.startServing = this.startServing.bind(this);
        this.stopServing = this.stopServing.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.updateProjects = this.updateProjects.bind(this);
    }


    styles = {
        divStyle: {
            backgroundColor: '#000ffff',
            margin: "auto",
            width: '100%',
            border: '10%',
        },
        table: {
            height: '100%',
            width: '100%',
            backgroundColor: '#ffffa0',
        },
        tableRow: {
            align: 'center',
        },
        addProjectCard: {
            position: "absolute",
            top: 0,
            left: 0,
        }
    }

    updateProjects = p => {
        this.props.setProjects(p);
    }

    deleteProject = () => {
        if (this.state.currentProject != null) {

        }
        // reload project list again because project will be deleted
    }

    startServing = () => {
        // event.preventDefault();
        // if (this.state.currentProject != "") {
        console.log("Something else tring to happen");
        axios.post('/serve/serveProject', {
            email: this.props.userEmail,
            projectTitle: this.state.currentProject
        }).then(function (response) {
            console.log(response);
            // change page to log in their projects
            // console.log(this.props.name);
        }).catch(function (error) {
            // check error and parse body to respond to the user correctly with bad loginMode
            console.log("Login post had error");
            console.log(error)
        });

    }

    stopServing() {
        if (this.state.currentProject !== "") {
            this.setState({servingCurrentProject: false});
        }

    }

    setCurrentProject = (project, listItem) => {
        this.setState({currentProject: project});
    }


    render() {



        return (

            <div>
                <table style={this.styles.table}>
                    <AddProjectCard userEmail={this.props.userEmail} setProjects={p => this.updateProjects(p)}/>
                    <tr>
                        <td>
                            <List>
                                {this.props.userProjects.map(function (project) {
                                    return <ListItem button
                                                     onClick={() => this.setCurrentProject(project)}
                                    >{project}</ListItem>
                                }, this)}
                            </List>

                        </td>
                        <td>
                            <label>Current Project: {this.state.currentProject}</label>
                        </td>
                        <td>
                            <tr>
                                <td>
                                    <Button type="button" onClick={this.startServing}
                                            disabled={this.state.servingCurrentProject}>Serve Static Project Files
                                        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                                    </Button>
                                </td>
                                <td>
                                    <Button type="button" onClick={this.stopServing}
                                            disabled={!this.state.servingCurrentProject}>Stop Serving
                                        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                                    </Button>
                                </td>
                                <td>
                                    <Button type="button" onClick={this.deleteProject}>Delete Project
                                        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                                    </Button>
                                </td>
                            </tr>
                        </td>
                    </tr>
                </table>
            </div>


        );
    }
}

export default MainLandingPage;