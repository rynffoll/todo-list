import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Col, FormControl, Glyphicon, Grid, InputGroup, ProgressBar, Row} from "react-bootstrap";
import * as queryString from 'query-string';
import FilteredTaskList from "../FilteredTaskList";
import {EditableCategoryTree} from "../CategoryTree";
import {Link} from "react-router-dom";

export default class HomePage extends Component {

  calculateProgress = (category, tasks) => {
    // todo: move filtering by category to wrapper? or something else?
    const filteredTasks = tasks.filter(x => x.category === category);
    return (filteredTasks.filter(x => x.done).length / filteredTasks.length) * 100;
  };

  search = () => this.props.history.push({
    pathname: this.props.location.pathname,
    search: queryString.stringify({
      done: this.searchCheckbox.checked,
      query: this.searchQuery.value
    })
  });

  clearSearch = () => this.props.history.push({
    pathname: this.props.location.pathname,
    search: ""
  });

  addCategory = () => {
    this.props.categoryActions.add(this.addCategoryInput.value);
    this.addCategoryInput.value = "";
  };

  addTask = (categoryId) => () => {
    this.props.taskActions.add(categoryId, this.addTaskInput.value);
    this.addTaskInput.value = "";
  };

  // todo: fixme
  filter = (searchParams) => (item) => {
    if (searchParams.done === undefined
      && searchParams.query === undefined) {
      return true; // ignore filter
    } else {
      console.log(
        "item",
        item, item.done === (searchParams.done === "true"),
        item.title.includes(searchParams.query, "i")
      );
      return item.done === (searchParams.done === "true")
        && item.title.includes(searchParams.query);
    }
  };

  render() {
    const {
      categories, tasks,
      categoryActions, taskActions,
      match: {params}
    } = this.props;

    const categoryId = params.categoryId && parseInt(params.categoryId, 10);

    const searchParams = queryString.parse(this.props.location.search);

    return <div className="HomePage">
      <Grid>
        <Row>
          <div className="HomePage-header">
            <Col xs={4} md={6}>
              <div className="HomePage-title">
                <Link to="/">To-Do List</Link>
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
                               inputRef={ref => this.searchQuery = ref}
                               onChange={this.search}
                  />
                  <InputGroup.Addon>
                    <Glyphicon glyph="remove" onClick={this.clearSearch}/>
                  </InputGroup.Addon>
                </InputGroup>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <div className="HomePage-progressbar">
            <ProgressBar now={this.calculateProgress(categoryId, tasks.items)}/>
          </div>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <div className="HomePage-categories">
              <InputGroup>
                <FormControl type="text"
                             placeholder="Category title.."
                             inputRef={ref => this.addCategoryInput = ref}
                />
                <InputGroup.Button>
                  <Button onClick={this.addCategory}>Add</Button>
                </InputGroup.Button>
              </InputGroup>

              <EditableCategoryTree roots={categories.roots}
                                    items={categories.items}
                                    actions={categoryActions}
              />
            </div>
          </Col>

          <Col xs={6} md={8}>
            {
              categoryId !== undefined &&
              <div className="HomePage-tasks">
                <InputGroup>
                  <FormControl type="text"
                               placeholder="Task title.."
                               inputRef={ref => this.addTaskInput = ref}/>
                  <InputGroup.Button>
                    <Button onClick={this.addTask(categoryId)}>Add</Button>
                  </InputGroup.Button>
                </InputGroup>

                <FilteredTaskList
                  items={tasks.items}
                  actions={taskActions}
                  categoryId={categoryId}
                  filter={this.filter(searchParams)}
                />
              </div>
            }
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
