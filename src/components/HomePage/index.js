import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from "../Header/index";
import {Col, Grid, Row} from "react-bootstrap";
import CategoryTree from "../CategoryTree";
import TaskList from "../TaskList/index";

export default class HomePage extends Component {
  render() {
    const {categories, tasks, categoryActions, tasksActions} = this.props;

    const categoryId = parseInt(this.props.match.params.categoryId);

    return <div className="HomePage">
      <Grid>
        <Row>
          <Header progress={0.6}/>
          {/*header*/}
          {/*<LinearProgress mode="determinate" value={80}/>*/}
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
                      actions={tasksActions}
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
