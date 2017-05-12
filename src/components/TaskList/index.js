import React from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Glyphicon} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class TaskList extends React.Component {
  render() {
    const {items, actions, categoryId} = this.props;
    return <div className="TaskList">
      <button onClick={() => actions.add(categoryId, "123")}>Add</button>
      {
        items.filter(x => x.category === categoryId).map(x => (
          <div className="TaskList-item" key={x.id}>
            <Checkbox checked={x.done} onChange={() => actions.toggle(x.id)}/>
            {x.title}
            <Button bsSize="xsmall">
              <Link to={`/category/${categoryId}/task/${x.id}/edit`}>
                <Glyphicon glyph="edit"/>
              </Link>
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
