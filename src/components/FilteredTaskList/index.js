import React from 'react';
import PropTypes from 'prop-types';
import TaskList from "../TaskList";

export default class FilteredTaskList extends React.Component {
  render() {
    const {items, actions, categoryId, filter} = this.props;
    const filteredItems = items.filter(filter);
    return <TaskList actions={actions}
                     categoryId={categoryId}
                     items={filteredItems}
    />
  }
}

FilteredTaskList.propTypes = {
  filter: PropTypes.func,
  categoryId: PropTypes.number,
  items: PropTypes.array,
  actions: PropTypes.object,
};
