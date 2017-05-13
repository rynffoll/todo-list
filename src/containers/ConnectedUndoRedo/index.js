import {connect} from "react-redux";
import {ActionCreators} from 'redux-undo';
import UndoRedo from "../../components/UndoRedo/index";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onUndo: () => dispatch(ActionCreators.undo()),
  onRedo: () => dispatch(ActionCreators.redo()),
});

const ConnectedUndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo);

export default ConnectedUndoRedo;
