import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import EditTask from "../EditTask/index";
import {MovableCategoryTree} from "../CategoryTree";

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
    const {categories, tasks, categoryActions, taskActions} = this.props;
    const categoryId = parseInt(this.props.match.params.categoryId);
    const taskId = parseInt(this.props.match.params.taskId);

    return <div className="EditPage">
      <Grid>
        <Row>
          <Col xs={4} md={6}>
            <div className="EditPage-title">
              To-Do List
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <MovableCategoryTree roots={categories.roots}
                                 items={categories.items}
                                 onMove={this.onMove(taskId)}
            />
          </Col>
          <Col xs={6} md={8}>
            <EditTask item={tasks.items.find(x => x.id === taskId)}
                      onSave={this.onSave}
                      onCancel={this.onCancel}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  }
}
