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
            projects: [],
            file: ""
        };

        this.startServing = this.startServing.bind(this);
        this.stopServing = this.stopServing.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
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


// method that pulls all the user's projects from the db to list them as list objects that the user can click on
// when the user clicks on a project, the project view should update by the list object passing
// the projects props "Aka project name and user's username"
// *might have to put this in an async method if it's making calls to eh database - worry about when to render this!

// project view should display a delete button for the project, a start button so my server serves the project
// and a stop serving project to stop it // OR if the website closes, then stop hosting all of the user's projects
// make sure the Project View is updating to show which projects are currently live and currently closed.
// Maybe have a button that switches the name based on the action? IDK

// when the user presses the stop serving button - you can move the files to the "cold storage" like brian was saying
// if they try to search for the files to serve, you can't serve them a 404
// if they start serving, move the cold files back from cold storage


    deleteProject = () => {
        if (this.state.currentProject != null) {

        }
        // reload project list again because project will be deleted
    }

    startServing = () => {
        // event.preventDefault();
        // if (this.state.currentProject != "") {
        console.log("Somethine else tring to happen");
        // this.state.currentProject.currentlyServingProject = true;
        // this.setState({servingCurrentProject: true});
        // send a get request with the username/projectname as parameters - express will then respond with the file names
        // maybe let them know that the index file needs to be
        // I then open up a new tab with the index.file
        axios.post('/project', {
            email: 'test@gmail.com',
            projectTitle: 'Static Website'
        }).then(function (response) {
            console.log("Yay! User logged in");
            console.log(response.data.user.email);
            // change page to log in their projects
            // console.log(this.props.name);
        }).catch(function (error) {
            // check error and parse body to respond to the user correctly with bad loginMode
            console.log("Login post had error");
            console.log(error)
        });
        // }

    }

    stopServing() {
        if (this.state.currentProject !== "") {
            this.setState({servingCurrentProject: false});
        }

    }


    setCurrentProject = (project, listItem) => {
        this.setState({currentProject: project});
        if (project.currentlyServingProject) {
            this.setState({servingCurrentProject: true, backgroundColor: "#ff0000"});
        } else {
            this.setState({servingCurrentProject: false, backgroundColor: "#ff0000"});
        }
        // check the project's state - then you can disable the correct button - if being served, disable start
        // if not being served, disable stop


        // when a user clicks on a project, the state "current project" should update to the clicked project
        // when the start server button is called -

        //
        console.log(project.name);
        console.log("Hello world");
    }

    projects = [
        {
            name: "project 1",
            content: "Some content for project 1",
            currentlyServingProject: true,
        },
        {
            name: "project 2",
            content: "Some content for project 2",
            currentlyServingProject: true,
        },
        {
            name: "Project 3",
            currentlyServingProject: false,
        }];


    render() {

        var addProjectDialog = "";

        if(this.state.projectDialogOpen) {
            addProjectDialog = <AddProjectCard style={this.styles.addProjectCard}/>;
        }

        return (

            <div>
                <table style={this.styles.table}>
                    <AddProjectCard />
                    <tr>
                        <td>
                            <List>
                                {this.projects.map(function (project) {
                                    return <ListItem button
                                                     onClick={() => this.setCurrentProject(project)}
                                    >{project.name}</ListItem>
                                }, this)}
                            </List>

                        </td>
                        <td>
                            <label>Current Project: {this.state.currentProject.name}</label>
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