import {connect} from "react-redux";
import {tasks, categories} from '../../actions';
import {bindActionCreators} from "redux";
import EditPage from "../../components/EditPage";

const mapStateToProps = (state) => ({
  categories: state.categories.present,
  tasks: state.tasks.present,
});

const mapDispatchToProps = (dispatch) => ({
  categoryActions: bindActionCreators(categories, dispatch),
  taskActions: bindActionCreators(tasks, dispatch),
});

const ConnectedEditPage = connect(mapStateToProps, mapDispatchToProps)(EditPage);

export default ConnectedEditPage;
