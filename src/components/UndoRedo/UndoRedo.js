import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from "react-bootstrap";
import './UndoRedo.css';

export default class UndoRedo extends React.Component {
  render() {
    const {onUndo, onRedo} = this.props;
    return <div className="UndoRedo">
      <ButtonGroup>
        <Button onClick={onUndo}>Undo</Button>
        <Button onClick={onRedo}>Redo</Button>
      </ButtonGroup>
    </div>
  }
}

UndoRedo.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
};
