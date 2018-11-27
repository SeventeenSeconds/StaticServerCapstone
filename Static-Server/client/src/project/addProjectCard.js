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

const addProjectFiles = [];

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


    addProject = () => {
        console.log("adding projcet");


        // you'll have to add it to the db or whatever and pull the list again so the components update
    }

    uploadProject = async () => {

        if (this.state.validProjectTitle && addProjectFiles.length !== 0) {

            const data = new FormData();
            data.append('projectTitle', this.state.newProjectTitle);

            addProjectFiles.forEach(file => {
                data.append('files', file);
            });

            console.log("Project name: " + this.state.newProjectTitle);

            axios.post('/project/uploadProject', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // don't forget to clear the files list for new project
            // AND project title states, error messages, etc.
            this.handleClose();
        } else {
            this.setState({newProjectErrorMessage: "You must enter a project title."});
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        // make this for multiple at some point
        // just add the files to a list - maybe display the list if i have time
        // also create project folder to save on the backend

        console.log(acceptedFiles);

        console.log();

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

