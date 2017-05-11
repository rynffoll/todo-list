import React from 'react';
import PropTypes from 'prop-types';
import Category from "../Category/index";
import {Button, ButtonGroup, FormControl, Modal} from "react-bootstrap";

export default class CategoryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removeDialog: false,
      addDialog: false,
      editDialog: false,
      selectedCategory: -1,
    }
  }

  openDialog = (name, id) => this.setState({[name]: true, selectedCategory: id});
  closeDialog = (name) => this.setState({[name]: false, selectedCategory: -1});

  openRemoveDialog = (id) => this.openDialog("removeDialog", id);
  closeRemoveDialog = () => this.closeDialog("removeDialog");
  removeDialog = () =>
  this.state.removeDialog &&
  (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Remove {this.state.selectedCategory}?
      </Modal.Body>

      <Modal.Footer>
        <ButtonGroup>
          <Button onClick={this.closeRemoveDialog}>
            Close
          </Button>
          <Button bsStyle="danger" onClick={() => {
            this.props.actions.remove(this.state.selectedCategory);
            this.closeRemoveDialog();
          }}>Remove</Button>
        </ButtonGroup>
      </Modal.Footer>

    </Modal.Dialog>
  );

  openAddDialog = (id) => this.openDialog("addDialog", id);
  closeAddDialog = () => this.closeDialog("addDialog");
  addDialog = () =>
  this.state.addDialog &&
  (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Add to {this.state.selectedCategory}
        <FormControl componentClass="input"
                     placeholder="Category title.."
                     inputRef={(ref) => {
                       this.addToInput = ref
                     }}/>
      </Modal.Body>

      <Modal.Footer>
        <ButtonGroup>
          <Button onClick={this.closeAddDialog}>
            Close
          </Button>
          <Button bsStyle="success" onClick={() => {
            this.props.actions.addTo(this.state.selectedCategory, this.addToInput.value);
            this.closeAddDialog();
          }}>Add</Button>
        </ButtonGroup>
      </Modal.Footer>

    </Modal.Dialog>
  );

  openEditDialog = (id) => this.openDialog("editDialog", id);
  closeEditDialog = () => this.closeDialog("editDialog");
  // TODO: fix defaultValue in FormControl component
  editDialog = () =>
  this.state.editDialog &&
  (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Add to {this.state.selectedCategory}
        <FormControl componentClass="input"
                     defaultValue={this.props.items.find(x => x.id === this.state.selectedCategory).title}
                     placeholder="Category title.."
                     inputRef={(ref) => {
                       this.editInput = ref
                     }}/>
      </Modal.Body>

      <Modal.Footer>
        <ButtonGroup>
          <Button onClick={this.closeEditDialog}>
            Close
          </Button>
          <Button bsStyle="success" onClick={() => {
            this.props.actions.update(this.state.selectedCategory, this.editInput.value);
            this.closeEditDialog();
          }}>Edit</Button>
        </ButtonGroup>
      </Modal.Footer>

    </Modal.Dialog>
  );

  buildTree = (roots, items) => {
    return roots && roots.map(r => {
        const item = items.find(x => x.id == r);
        return (
          <Category
            key={item.id}
            id={item.id}
            title={item.title}
            onDelete={this.openRemoveDialog}
            onAdd={this.openAddDialog}
            onEdit={this.openEditDialog}
          >
            {this.buildTree(item.childs, items)}
          </Category>
        )
      })
  };

  render() {
    const {roots, items} = this.props;
    const tree = this.buildTree(roots, items);

    return <div className="CategoryTree">
      <div className="CategoryTree-add">
        <FormControl componentClass="input"
                     placeholder="Category title.."
                     inputRef={(ref) => {
                       this.addInput = ref
                     }}/>
        <Button onClick={() => {
          this.props.actions.add(this.addInput.value);
          this.addInput.value = "";
        }}>Add</Button>
      </div>
      <div className="CategoryTree-items">
        {tree}
      </div>

      {this.addDialog()}
      {this.removeDialog()}
      {this.editDialog()}
    </div>
  }
}

CategoryTree.propTypes = {
  roots: PropTypes.array,
  items: PropTypes.array,
};
