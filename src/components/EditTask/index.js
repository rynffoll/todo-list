import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, Checkbox, Button, ButtonGroup} from "react-bootstrap";

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, done, content} = this.props;

    return <div className="EditTask">
      <form>
        <FormGroup controlId="taskTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl componentClass="input"
                       defaultValue={title}
                       placeholder="Task title.."
                       inputRef={(ref) => {this.titleInput = ref}}/>
        </FormGroup>

        <Checkbox checked={done}>Done</Checkbox>

        <FormGroup controlId="taskContent">
          <ControlLabel>Content</ControlLabel>
          <FormControl componentClass="textarea"
                       defaultValue={content}
                       placeholder="Task content.."
                       inputRef={(ref) => {this.contentInput = ref}}/>
        </FormGroup>

        <ButtonGroup>
          <Button bsStyle="primary" onClick={() => {
            console.log("title", this.titleInput.value);
            console.log("content", this.contentInput.value);
          }}>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </form>
    </div>
  }
}

EditTask.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  category: PropTypes.number,
  task: PropTypes.number,
  title: PropTypes.string,
  done: PropTypes.bool,
  content: PropTypes.string,
};
