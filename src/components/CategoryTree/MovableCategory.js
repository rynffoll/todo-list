import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Button, ButtonGroup, Glyphicon} from "react-bootstrap";
import './Category.css';

export default class MovableCategory extends React.Component {
  render() {
    const {id, title, children, onMove} = this.props;

    return <div className="Category">

      <div className="Category-item">
        <div className="Category-title">
          <NavLink activeClassName="Category-active-link"
                   to={`/category/${id}`}
                   exact={false}
          >
            {title}
          </NavLink>
        </div>

        <div className="Category-controls">
          <ButtonGroup bsSize="xsmall">
            <Button onClick={() => onMove(id)}><Glyphicon glyph="arrow-left"/></Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="Category-childs">
        {children}
      </div>
    </div>
  }
}

MovableCategory.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onMove: PropTypes.func,
};
