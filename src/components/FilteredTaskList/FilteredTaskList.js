import React from 'react';
import PropTypes from 'prop-types';
import {TaskList} from "../TaskList";

export default class FilteredTaskList extends React.Component {
  render() {
    const {filter, items, ...props} = this.props;
    const filteredItems = items.filter(filter);
    const newProps = {...props, items: filteredItems};
    return <TaskList {...newProps} />
  }
}

FilteredTaskList.propTypes = {
  filter: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};
