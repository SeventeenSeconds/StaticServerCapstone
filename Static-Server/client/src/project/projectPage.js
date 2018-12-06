import React, {Component} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ProjectCard from './projectCard';
import AddProjectCard from './addProjectCard';
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
            backgroundColor: '#d6d7d9',
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

    openProject = (project) => {
        // this.setState({currentProject: project});

    }

    render() {

        return (

            <div>
                <table style={this.styles.table}>
                    <AddProjectCard userEmail={this.props.userEmail} setProjects={p => this.updateProjects(p)} userProjects={this.props.userProjects}/>
                    <Divider />
                    <tr>

                        <td>
                            <List>
                                {this.props.userProjects.map(function (project) {
                                    return <ProjectCard setProjects={p => this.updateProjects(p)} userEmail={this.props.userEmail} projectTitle={project.projectTitle} projectIndex={project.index}/>
                                }, this)}
                            </List>

                        </td>
                    </tr>
                </table>
            </div>


        );
    }
}

export default MainLandingPage;