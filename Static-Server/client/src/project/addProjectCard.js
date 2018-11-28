import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropzone from 'react-dropzone';

let addProjectFiles = [];

class AddProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            currentProject: "",
            servingCurrentProject: "",
            backgroundColor: "",
            projects: [],
            newProjectTitle: "",
            newProjectErrorMessage: "",
            validProjectTitle: false,
        };

        this.onDrop = this.onDrop.bind(this);
        this.uploadProject = this.uploadProject.bind(this);
        this.setProjectName = this.setProjectName.bind(this);
    }

    uploadProject = async () => {

        if (this.state.validProjectTitle && addProjectFiles.length !== 0) {

            const data = new FormData();
            data.append('userEmail', this.props.userEmail);
            data.append('projectTitle', this.state.newProjectTitle);

            addProjectFiles.forEach(file => {
                data.append('files', file);
            });

            axios.post('/project/uploadProject', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data.projects);
                // update project page with state
                this.props.setProjects(response.data.projects);

            }).catch((error) => {
                console.log(error);
            });

            //TODO: Add project to to projectLIST client side
            // need to pass back project array to project state
            // on project display page
            // method on project page that sets the project state
            // just like the register function passed back the array of usernames
            // same with the projects - but set it from here
            //TODO: set new project array state for display


            this.setState({newProjectTitle: "", validProjectTitle: false});
            addProjectFiles = [];
            this.handleClose();
        } else {
            this.setState({newProjectErrorMessage: "You must enter a project title."});
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        // maybe upload a list to show the user what files they've added
        acceptedFiles.forEach(file => {
            addProjectFiles.push(file);
        });
    }

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    setProjectName = value => {
        let val = value.currentTarget.value.trim();
        if (val !== null && val !== "") {
            this.setState({newProjectTitle: value.currentTarget.value, validProjectTitle: true, newProjectErrorMessage: ""});
        } else {
            this.setState({newProjectErrorMessage: "You must enter a project title.", validProjectTitle: false});
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen('paper')}>Add Project</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle id="scroll-dialog-title">Add Project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TextField
                                required
                                label="Project Title"
                                margin="normal"
                                onChange={this.setProjectName}
                                helperText={this.state.newProjectErrorMessage}
                            />
                        </DialogContentText>
                        <div>
                            <Dropzone
                                onDrop={(accepted, rejected) => {
                                    this.onDrop(accepted, rejected)
                                }}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.uploadProject} color="primary">
                            Upload Project
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddProjectCard;

