import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MovableCategoryTree} from "../CategoryTree";
import {EditTask} from "../EditTask";
import './EditPage.css';

export default class EditPage extends Component {

  onMove = (id) => (category) => {
    this.props.taskActions.move(id, category);
    this.props.history.goBack();
  };

  onSave = (item) => {
    this.props.taskActions.update(item);
    this.props.history.goBack();
  };

  onCancel = () => this.props.history.goBack();

  render() {
    const {
      categories, tasks,
      match: {params}
    } = this.props;
    const taskId = parseInt(params.taskId, 10);
    const taskItem = tasks.items.find(x => x.id === taskId);

    return <div className="EditPage">
      <Grid>
        <Row>
          <div className="EditPage-header">
            <Col xs={4} md={6}>
              <div className="EditPage-title">
                <Link to="/">To-Do List #{taskId}</Link>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <div className="EditPage-categories">
              <MovableCategoryTree roots={categories.roots}
                                   items={categories.items}
                                   onMove={this.onMove(taskId)}
              />
            </div>
          </Col>
          <Col xs={6} md={8}>
            <div className="EditPage-editor">
              <EditTask item={taskItem}
                        onSave={this.onSave}
                        onCancel={this.onCancel}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  }
}
