import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddProjectCard from './addProjectCard';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

class MainLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: "",
            servingCurrentProject: "",
            backgroundColor: "",
            file: "",
        };

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
        },
    }

    updateProjects = p => {
        this.props.setProjects(p);
    }

    deleteProject = () => {
        if (this.state.currentProject != null) {

        }
        // reload project list again because project will be deleted
    }

    setCurrentProject = (project) => {
        this.setState({currentProject: project});
    }

    render() {

        return (

            <div>
                <table style={this.styles.table}>
                    <AddProjectCard userEmail={this.props.userEmail} setProjects={p => this.updateProjects(p)} userProjects={this.props.userProjects}/>
                    <tr>
                        <td>
                            <List>
                                {this.props.userProjects.map(function (project) {
                                    return <ListItem key={project.projectTitle} button
                                                     onClick={() => this.setCurrentProject(project)}
                                    >{project.projectTitle}</ListItem>
                                }, this)}
                            </List>

                        </td>
                        <td>
                            <tr>
                                <td>
                                    <Button type="button" onClick={this.deleteProject}>
                                        <DeleteIcon/>
                                        Delete Project
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