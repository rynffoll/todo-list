import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, Checkbox, Button, ButtonGroup} from "react-bootstrap";

export default class EditTask extends React.Component {

  createItem = () => ({
    ...this.props.item,
    title: this.titleInput.value,
    content: this.contentInput.value,
    done: this.doneCheckbox.checked,
  });

  render() {
    const {item, onSave, onCancel} = this.props;

    return <div className="EditTask">
      <form>
        <FormGroup controlId="taskTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl componentClass="input"
                       defaultValue={item.title}
                       placeholder="Task title.."
                       inputRef={ref => this.titleInput = ref}
          />
        </FormGroup>

        <Checkbox checked={item.done}
                  inputRef={ref => this.doneCheckbox = ref}
        >
          Done
        </Checkbox>

        <FormGroup controlId="taskContent">
          <ControlLabel>Content</ControlLabel>
          <FormControl componentClass="textarea"
                       defaultValue={item.content}
                       placeholder="Task content.."
                       inputRef={ref => this.contentInput = ref}/>
        </FormGroup>

        <ButtonGroup>
          <Button bsStyle="primary" onClick={() => onSave(this.createItem())}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      </form>
    </div>
  }
}

EditTask.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  item: PropTypes.object,
};
