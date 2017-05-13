import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Col, FormControl, Glyphicon, Grid, InputGroup, ProgressBar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as queryString from 'query-string';
import {FilteredTaskList} from "../FilteredTaskList";
import {EditableCategoryTree} from "../CategoryTree";
import './HomePage.css';

export default class HomePage extends Component {

  calculateProgress = (category, tasks) => {
    const filteredTasks = tasks.filter(x => x.category === category);
    return (filteredTasks.filter(x => x.done).length / filteredTasks.length) * 100;
  };

  searchByStatus = () => {
    const {history, location} = this.props;
    const search = queryString.parse(location.search);
    history.push({
      pathname: location.pathname,
      search: queryString.stringify({
        ...search,
        done: this.searchCheckbox.checked
      })
    });
  };

  searchByQuery = () => {
    const {history, location} = this.props;
    const search = queryString.parse(location.search);
    history.push({
      pathname: location.pathname,
      search: queryString.stringify({
        ...search,
        query: this.searchQuery.value
      })
    });
  };

  clearSearch = () => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: ""
    });
    this.searchQuery.value = "";
    this.searchCheckbox.checked = false;
  };

  addCategory = () => {
    this.props.categoryActions.add(this.addCategoryInput.value);
    this.addCategoryInput.value = "";
  };

  addTask = (categoryId) => () => {
    this.props.taskActions.add(categoryId, this.addTaskInput.value);
    this.addTaskInput.value = "";
  };

  editTask = (id) => {
    const {history, location} = this.props;
    history.push({pathname: `${location.pathname}/task/${id}/edit`});
  };

  toggleTask = (id) => this.props.taskActions.toggle(id);

  filter = (searchParams) => (item) => {
    let result = true;

    if (searchParams.done !== undefined) {
      const done = (searchParams.done === 'true');
      result = result && item.done === done;
    }

    if (searchParams.query !== undefined) {
      const regExp = new RegExp(searchParams.query, "i");
      result = result && regExp.test(item.title);
    }

    return result;
  };

  render() {
    console.log(this.props)
    const {
      categories, tasks,
      categoryActions,
      match: {params},
      location
    } = this.props;

    const categoryId = params.categoryId && parseInt(params.categoryId, 10);
    const taskItems = tasks.items.filter(x => categoryId === undefined || x.category === categoryId);
    const searchParams = queryString.parse(location.search);

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
                              onChange={this.searchByStatus}
                    >
                      Show done
                    </Checkbox>
                  </InputGroup.Addon>
                  <FormControl type="text"
                               placeholder="Search task.."
                               inputRef={ref => this.searchQuery = ref}
                               onChange={this.searchByQuery}
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
          <div className="HomePage-progress">
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

                <FilteredTaskList items={taskItems}
                                  filter={this.filter(searchParams)}
                                  onEdit={this.editTask}
                                  onToggle={this.toggleTask}
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
