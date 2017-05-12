import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Col, FormControl, Grid, InputGroup, ProgressBar, Row} from "react-bootstrap";
import CategoryTree from "../CategoryTree";
import TaskList from "../TaskList/index";
import * as queryString from 'query-string';

export default class HomePage extends Component {

  calculateProgress = (category, tasks) => {
    // todo: move filtering by category to wrapper? or something else?
    const filteredTasks = tasks.filter(x => x.category === category);
    return (filteredTasks.filter(x => x.done).length / filteredTasks.length) * 100;
  };

  search = () => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: queryString.stringify({
        done: this.searchCheckbox.checked,
        query: this.searchInput.value
      })
    });
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
              <InputGroup>
                <InputGroup.Addon>
                  <Checkbox inline
                            inputRef={ref => this.searchCheckbox = ref}
                            onChange={this.search}
                  >
                    Show done
                  </Checkbox>
                </InputGroup.Addon>
                <FormControl type="text"
                             placeholder="Search task.."
                             inputRef={ref => this.searchInput = ref}
                             onChange={() => setTimeout(this.search, 300)}
                />
              </InputGroup>
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
            <InputGroup>
              <FormControl type="text"
                           placeholder="Category title.."
                           inputRef={(ref) => {
                             this.categoryInput = ref
                           }}/>
              <InputGroup.Button>
                <Button onClick={() => {
                  categoryActions.add(this.categoryInput.value);
                  this.categoryInput.value = "";
                }}>Add</Button>
              </InputGroup.Button>
            </InputGroup>

            <CategoryTree roots={categories.roots}
                          items={categories.items}
                          actions={categoryActions}
            />
          </Col>
          <Col xs={6} md={8}>
            <InputGroup>
              <FormControl type="text"
                           placeholder="Task title.."
                           inputRef={(ref) => {
                             this.taskInput = ref
                           }}/>
              <InputGroup.Button>
                <Button onClick={() => {
                  taskActions.add(categoryId, this.taskInput.value);
                  this.taskInput.value = "";
                }}>Add</Button>
              </InputGroup.Button>
            </InputGroup>

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
