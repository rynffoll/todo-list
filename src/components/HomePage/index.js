import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Col, FormControl, Grid, ProgressBar, Row} from "react-bootstrap";
import CategoryTree from "../CategoryTree";
import TaskList from "../TaskList/index";

export default class HomePage extends Component {

  calculateProgress = (category, tasks) => {
    // todo: move filtering by category to wrapper? or something else?
    const filteredTasks = tasks.filter(x => x.category === category);
    return (filteredTasks.filter(x => x.done).length / filteredTasks.length) * 100;
  };

  render() {
    const {categories, tasks, categoryActions, taskActions} = this.props;

    const categoryId = parseInt(this.props.match.params.categoryId);

    return <div className="HomePage">
      <Grid>
        <Row>
          <Col xs={4} md={6}>
            <div className="HomePage-title">
              To-Do List
            </div>
          </Col>
          <Col xs={8} md={6}>
            <div className="HomePage-search">
              <Checkbox inline>Show done</Checkbox>
              <FormControl type="text" placeholder="Search query.."/>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="HomePage-progressbar">
            <ProgressBar now={this.calculateProgress(categoryId, tasks.items)}/>
          </div>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <CategoryTree roots={categories.roots}
                          items={categories.items}
                          actions={categoryActions}
            />
          </Col>
          <Col xs={6} md={8}>
            <TaskList items={tasks.items}
                      actions={taskActions}
                      categoryId={categoryId}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  }
}

HomePage.propTypes = {
  categories: PropTypes.object,
  tasks: PropTypes.object,
  actions: PropTypes.object,
};
