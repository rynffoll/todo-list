import React from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Glyphicon} from "react-bootstrap";

export default class TaskList extends React.Component {
  render() {
    const {items, actions} = this.props;
    return <div className="TaskList">
      <button onClick={() => actions.add(this.props.categoryId, "123")}>Add</button>
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
  items: PropTypes.array,
  actions: PropTypes.object,
};
