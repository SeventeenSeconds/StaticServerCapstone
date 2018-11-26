import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';

const fileDialog = require('file-dialog');

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
            file: "",
            projectDialogOpen: true
        };
    }

    addProject = () => {
        console.log("adding projcet");


        // you'll have to add it to the db or whatever and pull the list again so the components update
    }

    selectFiles = async event => {
        event.preventDefault();
        fileDialog({accept: 'images/*'})
            .then(files => {
                console.log("uploading project");

                // for( var i = 0; i < files.length; i++ ){
                //     let file = this.files[i];
                //
                //     formData.append('files[' + i + ']', file);
                // }

                // formData.append('file', files[0]);

                console.log(files[0]);
                var file = files[0];

                const data = new FormData();

                data.append('action', 'ADD');
                data.append('param', 0);
                data.append('secondParam', 0);
                data.append('file', new Blob([file], {type: 'image/*'}));

                this.uploadFiles(data);

            });
    }

    uploadFiles = async (data) => {
        console.log("Here");
        axios.post('/project/uploadProject', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

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
                            Instructions maybe later??
                        </DialogContentText>
                        <Button onClick={this.selectFiles} color="primary">
                            Upload Project Files
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Add Project
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddProjectCard;

