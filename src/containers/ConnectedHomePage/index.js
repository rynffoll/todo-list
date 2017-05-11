import {connect} from "react-redux";
import {tasks, categories} from '../../actions';
import {bindActionCreators} from "redux";
import HomePage from "../../components/HomePage";

const mapToProps = (state) => ({
  categories: state.categories,
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  categoryActions: bindActionCreators(categories, dispatch),
  taskActions: bindActionCreators(tasks, dispatch),
});

const ConnectedHomePage = connect(mapToProps, mapDispatchToProps)(HomePage);

export default ConnectedHomePage;
