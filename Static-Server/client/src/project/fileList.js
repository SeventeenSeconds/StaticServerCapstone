import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

;

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
        };
    }

    handleToggle = value => () => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [];

        if (currentIndex === -1) {
            // if not clicked - set clicked
            newChecked.push(value);
        } else {
            // if already clicked - unclick
            newChecked.splice(0, 1);
        }

        this.setState({
            checked: newChecked,
        });

        if (checked.length === 0) {
            this.props.setIndex("");
        } else {
            this.props.setIndex(value);
        }
    };

    render() {

        return (
            <List>
                Please select an "index" page.
                {this.props.projectFiles.map(file => (
                    <ListItem key={file.name} role={undefined} dense button onClick={this.handleToggle(file.name)}>
                        <Checkbox
                            checked={this.state.checked.indexOf(file.name) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={file.name}/>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default FileList;