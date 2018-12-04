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
import AddIcon from '@material-ui/icons/Add';
import FileList from './fileList';

class AddProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            currentProject: "",
            servingCurrentProject: "",
            backgroundColor: "",
            newProjectTitle: "",
            newProjectErrorMessage: "",
            validProjectTitle: false,
            projectFiles: [],
            index: "",
        };

        this.onDrop = this.onDrop.bind(this);
        this.uploadProject = this.uploadProject.bind(this);
        this.setProjectName = this.setProjectName.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.setIndexFile = this.setIndexFile.bind(this);
    }

    setIndexFile = file => {
        this.setState({index: file});
        console.log("Index set to " + file);
    }

    uploadProject = async event => {
        event.preventDefault();

        if (this.state.validProjectTitle) {
            if (this.state.projectFiles.length !== 0) {

                const data = new FormData();
                data.append('userEmail', this.props.userEmail);
                data.append('projectTitle', this.state.newProjectTitle);

                this.state.projectFiles.forEach(file => {
                    data.append('files', file);
                });

                axios.post('/project/uploadProject', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    this.props.setProjects(response.data.projects);

                }).catch((error) => {
                    console.log(error);
                });


                this.setState({newProjectTitle: "", validProjectTitle: false, newProjectErrorMessage: ""});
                this.handleClose();
            } else {
                this.setState({newProjectErrorMessage: "You must add project file/s."});
            }
        } else {
            this.setState({newProjectErrorMessage: "You must enter a project title."});
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        // maybe upload a list to show the user what files they've added
        var files = this.state.projectFiles;

        acceptedFiles.forEach(file => {
            files.push(file.name);
        });
        this.setState({projectFiles: files});
        console.log("project file added");
    }

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClear = () => {
        this.setState({projectFiles: []});
    }

    setProjectName = value => {
        let val = value.currentTarget.value.trim();
        if (this.props.userProjects.indexOf(val) > -1) {
            this.setState({newProjectErrorMessage: "Project title already exists.", validProjectTitle: false});
        } else {
            if (val !== null && val !== "") {
                this.setState({
                    newProjectTitle: value.currentTarget.value,
                    validProjectTitle: true,
                    newProjectErrorMessage: ""
                });
            } else {
                this.setState({newProjectErrorMessage: "You must enter a project title.", validProjectTitle: false});
            }
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen('paper')}><AddIcon/>Add Project</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                >
                    <DialogTitle>Add Project</DialogTitle>
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

                        <Dropzone
                            onDrop={(accepted, rejected) => {
                                this.onDrop(accepted, rejected)
                            }}/>
                        <FileList projectFiles={this.state.projectFiles} setIndex={i => this.setIndexFile(i)}/>
                        <Button onClick={this.handleClear} color="primary">
                            Clear Files
                        </Button>
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

