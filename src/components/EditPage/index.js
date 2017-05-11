import React, {Component} from 'react';
import ConnectedCategoryTree from "../../containers/ConnectedCategoryTree/index";
import {Card, Grid} from "material-ui";
import ConnectedTaskList from "../../containers/ConnectedTaskList/index";
import Header from "../Header/index";

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
            <ConnectedCategoryTree />
          </Card>
        </Grid>
        <Grid item xs={16} sm={8}>
          <Card>
            <ConnectedTaskList />
          </Card>
        </Grid>
      </Grid>
    </div>
  }
}
