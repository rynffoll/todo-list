import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Checkbox, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Grid, InputGroup,
  ProgressBar, Row
} from "react-bootstrap";

export default class Header extends React.Component {
  render() {
    const {progress} = this.props;
    return <div className="Header">
      <Grid>
        <Row>
          <Col xs={4} md={6}>
            <div className="Header-title">
              To-Do List
            </div>
          </Col>
          <Col xs={8} md={6}>
            <div className="Header-search">
              <form>
                <FormGroup>
                  <Checkbox inline>Show done</Checkbox>
                  <FormControl type="text" placeholder="Search query.."/>
                </FormGroup>
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="Header-progress">
            <ProgressBar now={progress * 100}/>
          </div>
        </Row>
      </Grid>
    </div>
  }
}

Header.propTypes = {
  progress: PropTypes.number,
};
