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
import CloseIcon from '@material-ui/icons/Close';
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
                if (this.state.index !== "") {

                    const data = new FormData();
                    data.append('userEmail', this.props.userEmail);
                    data.append('projectTitle', this.state.newProjectTitle);
                    data.append('index', this.state.index);

                    this.state.projectFiles.forEach(file => {
			console.log("test " + file); 
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


                    this.setState({newProjectTitle: "", validProjectTitle: false, newProjectErrorMessage: "", index: "", projectFiles: []});
                    this.handleClose();
                } else {
                    this.setState({newProjectErrorMessage: "You must select and index file."});
                }
            } else {
                this.setState({newProjectErrorMessage: "You must add project file/s."});
            }
        } else {
            this.setState({newProjectErrorMessage: "You must enter a project title."});
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        var files = this.state.projectFiles;

        acceptedFiles.forEach(file => {
            files.push(file);
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
        this.setState({projectFiles: [], index: ""});
    }

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
                <Button style={this.style.button} onClick={this.handleClickOpen('paper')}><AddIcon/>Add Project</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                >
                    <DialogTitle style={this.style.topCard}>Add Project</DialogTitle>

                    <DialogContent style={this.style.dialog}>
                        <DialogContentText>
                            <TextField
                                required
                                label="Project Title"
                                // margin="normal"
                                onChange={this.setProjectName}
                                helperText={this.state.newProjectErrorMessage}
                            />
                        </DialogContentText>

                        <Dropzone
                            onDrop={(accepted, rejected) => {
                                this.onDrop(accepted, rejected)
                            }}/>
                        <FileList projectFiles={this.state.projectFiles} setIndex={i => this.setIndexFile(i)}/>
                        <Button
                            style={this.style.clear}
                            onClick={this.handleClear} color="primary">
                            <CloseIcon/>
                            Clear Files
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button style={this.style.button} onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button style={this.style.button} onClick={this.uploadProject} color="primary">
                            Upload Project
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddProjectCard;

