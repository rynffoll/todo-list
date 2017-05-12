import {connect} from "react-redux";
import {tasks, categories} from '../../actions';
import {bindActionCreators} from "redux";
import EditPage from "../../components/EditPage";

const mapToProps = (state) => ({
  categories: state.categories,
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  categoryActions: bindActionCreators(categories, dispatch),
  taskActions: bindActionCreators(tasks, dispatch),
});

const ConnectedEditPage = connect(mapToProps, mapDispatchToProps)(EditPage);

export default ConnectedEditPage;
