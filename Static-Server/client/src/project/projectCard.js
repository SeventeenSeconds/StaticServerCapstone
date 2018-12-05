import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
        // new tab

    }

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
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
                    <DialogTitle>{this.props.projectTitle}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Exit
                        </Button>
                        <Button onClick={this.openProject} color="primary">
                            Open Project
                        </Button>
                        <Button type="button" onClick={this.deleteProject}>
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

