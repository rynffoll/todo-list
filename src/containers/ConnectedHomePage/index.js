import {connect} from "react-redux";
import {tasks, categories} from '../../actions';
import {bindActionCreators} from "redux";
import HomePage from "../../components/HomePage";

const mapStateToProps = (state) => ({
  categories: state.categories.present,
  tasks: state.tasks.present,
});

const mapDispatchToProps = (dispatch) => ({
  categoryActions: bindActionCreators(categories, dispatch),
  taskActions: bindActionCreators(tasks, dispatch),
});

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default ConnectedHomePage;
