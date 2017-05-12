import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Button, ButtonGroup, Collapse, Glyphicon} from "react-bootstrap";
import './Category.css';

export default class EditableCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    }
  }

  toggleExpander = () => this.setState({expanded: !this.state.expanded});

  render() {
    const {id, title, children, onAdd, onEdit, onDelete} = this.props;
    const expanded = this.state.expanded;
    return <div className="Category">

      <div className="Category-item">
        {
          children && children.length > 0 &&
          <div className="Category-expander">
            <Glyphicon onClick={this.toggleExpander} glyph={expanded ? 'menu-up' : 'menu-down'}/>
          </div>
        }

        <div className="Category-title">
          <NavLink activeClassName="Category-title-active" to={`/category/${id}`}>
            {title}
          </NavLink>
        </div>

        <div className="Category-controls">
          <ButtonGroup bsSize="xsmall">
            <Button onClick={() => onAdd(id)}><Glyphicon glyph="plus-sign"/></Button>
            <Button onClick={() => onEdit(id)}><Glyphicon glyph="edit"/></Button>
            <Button onClick={() => onDelete(id)}><Glyphicon glyph="trash"/></Button>
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

EditableCategory.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
};
