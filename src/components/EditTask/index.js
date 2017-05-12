import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, Checkbox, Button, ButtonGroup} from "react-bootstrap";

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // todo: maybe inputRef?
      done: props.item.done
    }
  }

  createItem = () => ({
    ...this.props.item,
    title: this.titleInput.value,
    content: this.contentInput.valuEditableCategoryTreee,
    done: this.state.done,
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
                       inputRef={(ref) => {
                         this.titleInput = ref
                       }}/>
        </FormGroup>

        <Checkbox checked={this.state.done} onChange={() => this.setState({done: !this.state.done})}>
          Done
        </Checkbox>

        <FormGroup controlId="taskContent">
          <ControlLabel>Content</ControlLabel>
          <FormControl componentClass="textarea"
                       defaultValue={item.content}
                       placeholder="Task content.."
                       inputRef={(ref) => {
                         this.contentInput = ref
                       }}/>
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
  category: PropTypes.number,
  task: PropTypes.number,
  title: PropTypes.string,
  done: PropTypes.bool,
  content: PropTypes.string,
};
