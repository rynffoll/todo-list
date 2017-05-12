import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import EditTask from "../EditTask/index";
import {MovableCategoryTree} from "../CategoryTree";
import {Link} from "react-router-dom";

export default class EditPage extends Component {

  onMove = (id) => (category) => {
    this.props.taskActions.move(id, category);
    this.props.history.goBack();
  };

  onSave = (item) => {
    this.props.taskActions.edit(item);
    this.props.history.goBack();
  };

  onCancel = () => this.props.history.goBack();

  render() {
    const {
      categories, tasks,
      categoryActions, taskActions,
      match: {params}
    } = this.props;
    const categoryId = params.categoryId && parseInt(params.categoryId);
    const taskId = params.taskId && parseInt(params.taskId);

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
              <EditTask item={tasks.items.find(x => x.id === taskId)}
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
