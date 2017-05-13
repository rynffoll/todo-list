import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

export default class TaskList extends React.Component {
  render() {
    const {items, onEdit, onToggle} = this.props;

    return <div className="TaskList">
      {
        items.map((x, i) =>
          <div className="TaskList-item" key={i}>
            <Task item={x} onEdit={onEdit} onToggle={onToggle}/>
          </div>
        )
      }
    </div>
  }
}

TaskList.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
