import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';


class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper'
        };

        this.deleteProject = this.deleteProject.bind(this);
        this.openProject = this.openProject.bind(this);
    }

    deleteProject = async event => {
        event.preventDefault();
        // axios call to db
        axios.post('/project/deleteProject', {
            'userEmail': this.props.userEmail,
            'projectTitle': this.props.projectTitle,
        }).then((response) => {
            this.props.setProjects(response.data.projects);
        }).catch((error) => {
            console.log(error);
        });

    }

    openProject = () => {
        window.open('http://staticfileserver.zapto.org/serve/' + this.props.userEmail + '/' + this.props.projectTitle + '/' + this.props.projectIndex);
        // window.open('/serve/' + this.props.userEmail + '/' + this.props.projectTitle + '/' + this.props.projectIndex);
    };

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    style = {
        button: {
            color: 'black',
            background: '#4ad1aa'
        },
        dialog: {
            textAlign: 'center',
        },
        topCard: {
            background: '#d6d7d9'
        },
        clear: {
            color: 'red',
        }
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen('paper')}>{this.props.projectTitle}</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                >
                    <DialogTitle style={this.style.topCard}>{this.props.projectTitle}</DialogTitle>
                    <DialogContent>
                        <br/>
                        Project Address:
                        <br />
                        <a onClick={this.openProject} style={{cursor: 'pointer'}}>staticfileserver.zapto.org/serve/{this.props.userEmail}/{this.props.projectTitle}/{this.props.projectIndex}</a>
                    </DialogContent>
                    <DialogActions style={this.style.dialog}>
                        <Button
                            onClick={this.handleClose}
                            style={this.style.button}>
                            Exit
                        </Button>
                        <Button
                            type="button"
                            style={this.style.button}
                            onClick={this.deleteProject}>
                            <DeleteIcon/>
                            Delete Project
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ProjectCard;

