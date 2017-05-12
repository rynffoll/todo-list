import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Col, FormControl, Glyphicon, Grid, InputGroup, ProgressBar, Row} from "react-bootstrap";
import * as queryString from 'query-string';
import FilteredTaskList from "../FilteredTaskList";
import {EditableCategoryTree} from "../CategoryTree";

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
      query: this.searchInput.value
    })
  });

  clearSearch = () => console.log(this.props) || this.props.history.push({
    pathname: this.props.location.pathname,
    search: ""
  });

  render() {
    const {categories, tasks, categoryActions, taskActions} = this.props;

    const categoryId = parseInt(this.props.match.params.categoryId);

    const searchParams = queryString.parse(this.props.location.search);
    console.log(searchParams);

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
                <InputGroup.Addon>
                  <Glyphicon glyph="remove" onClick={this.clearSearch}/>
                </InputGroup.Addon>
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

            <EditableCategoryTree roots={categories.roots}
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

            <FilteredTaskList
              items={tasks.items}
              actions={taskActions}
              categoryId={categoryId}
              filter={item => {
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
              }}
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
