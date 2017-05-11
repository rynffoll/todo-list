import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Collapse, Fade, Glyphicon} from "react-bootstrap";
import './Category.css';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    }
  }

  render() {
    const {id, title, children, onAdd, onEdit, onDelete, onMove} = this.props;
    const expanded = this.state.expanded;
    return <div className="Category">

      <div className="Category-item">
        {
          children && children.length > 0 &&
          <div className="Category-expander">
            <Glyphicon onClick={() => this.setState({expanded: !expanded})} glyph={expanded ? 'menu-up' : 'menu-down'}/>
          </div>
        }

        <div className="Category-title">
          <Link to={`/category/${id}`}>
            {title}
          </Link>
        </div>

        <div className="Category-controls">
          <ButtonGroup bsSize="xsmall">
            <Button onClick={() => onAdd(id)}><Glyphicon glyph="plus-sign"/></Button>
            <Button onClick={() => onEdit(id)}><Glyphicon glyph="edit"/></Button>
            <Button onClick={() => onDelete(id)}><Glyphicon glyph="remove"/></Button>
          </ButtonGroup>
        </div>
      </div>

      <Collapse in={expanded}>
        <div className="Category-childs">
          {children}
        </div>
      </Collapse>
    </div>
  }
}

Category.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
};
