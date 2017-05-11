import React, {Component} from 'react';
import {Card, Grid} from "material-ui";
import TaskList from "../TaskList";
import CategoryTree from "../CategoryTree";

export default class EditPage extends Component {
  render() {
    return <div className="EditPage">
      <Grid container gutter={24}>
        <Grid item xs={12}>
          <Card>
            To-Do List #
          </Card>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Card>
            <CategoryTree />
          </Card>
        </Grid>
        <Grid item xs={16} sm={8}>
          <Card>
            <TaskList />
          </Card>
        </Grid>
      </Grid>
    </div>
  }
}
