import React, {Component} from 'react';
import ConnectedCategoryTree from "../../containers/ConnectedCategoryTree/index";
import ConnectedTaskList from "../../containers/ConnectedTaskList/index";
import Header from "../Header/index";
import EditTask from "../EditTask/index";
import {Col, Grid, Row} from "react-bootstrap";

export default class HomePage extends Component {
  render() {
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
            <ConnectedCategoryTree />
          </Col>
          <Col xs={6} md={8}>
            <ConnectedTaskList categoryId={categoryId}/>
          </Col>
        </Row>
      </Grid>
    </div>
  }
}
