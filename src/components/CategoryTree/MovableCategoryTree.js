import React from 'react';
import PropTypes from 'prop-types';
import MovableCategory from "./MovableCategory";

export default class MovableCategoryTree extends React.Component {
  buildTree = (roots, items) =>
  roots && roots.map(r => {
    const item = items.find(x => x.id === r);
    return <MovableCategory
      key={item.id}
      id={item.id}
      title={item.title}
      onMove={this.props.onMove}
    >
      {this.buildTree(item.childs, items)}
    </MovableCategory>
  });

  render() {
    const {roots, items} = this.props;
    const tree = this.buildTree(roots, items);

    return <div className="CategoryTree">
      {tree}
    </div>
  }
}

MovableCategoryTree.propTypes = {
  roots: PropTypes.array,
  items: PropTypes.array,
  onMove: PropTypes.func,
};
