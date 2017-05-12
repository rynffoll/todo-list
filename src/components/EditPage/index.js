import React, {Component} from 'react';
import CategoryTree from "../CategoryTree";
import {Checkbox, Col, FormControl, Grid, ProgressBar, Row} from "react-bootstrap";
import EditTask from "../EditTask/index";

export default class EditPage extends Component {

  onSave = (task) => {

  };

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
            <CategoryTree roots={categories.roots}
                          items={categories.items}
                          actions={categoryActions}
            />
          </Col>
          <Col xs={6} md={8}>
            <EditTask item={tasks.items.find(x => x.id === taskId)}
                      onSave={(item) => {
                        taskActions.edit(item);
                        this.props.history.push(`/category/${categoryId}`);
                      }}
                      onCancel={() => this.props.history.push(`/category/${categoryId}`)}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  }
}
