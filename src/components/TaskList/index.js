import React from 'react';
import PropTypes from 'prop-types';
import {push} from "react-router-redux";
import {Link} from "react-router-dom";
import {Button, Checkbox, Glyphicon} from "react-bootstrap";

export default class TaskList extends React.Component {
  render() {
    const {items, onEdit} = this.props;
    return <div className="TaskList">
      <button onClick={() => this.props.add(this.props.categoryId, "123")}>Add</button>
      {
        items.filter(x => x.category === this.props.categoryId).map(x => (
          <div className="TaskList-item" key={x.id}>
            <Checkbox checked={x.done} style={{display: "inline"}}/>
            {x.title}
            <Button bsSize="xsmall" onClick={() => this.onEdit(x.id)}>
              <Glyphicon glyph="edit"/>
            </Button>
          </div>
        ))
      }
    </div>
  }
}

TaskList.propTypes = {
  categoryId: PropTypes.number,
  onEdit: PropTypes.func,
  items: PropTypes.array,
};
