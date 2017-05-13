import React from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Glyphicon} from "react-bootstrap";
import './Task.css';

export default class Task extends React.Component {
  render() {
    const {item, onEdit, onToggle} = this.props;

    return <div className="Task">
      <div className="Task-status">
        <Checkbox checked={item.done} onChange={() => onToggle(item.id)}/>
      </div>

      <div className="Task-title">
        {item.title}
      </div>

      <div className="Task-edit">
        <Button bsSize="xsmall" onClick={() => onEdit(item.id)}>
          <Glyphicon glyph="edit"/>
        </Button>
      </div>
    </div>
  }
}

Task.propTypes = {
  item: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
