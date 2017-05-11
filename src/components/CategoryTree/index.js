import React from 'react';
import PropTypes from 'prop-types';
import Category from "../Category/index";
import {Button, ButtonGroup, Modal} from "react-bootstrap";

export default class CategoryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletedId: -1,
    }
  }

  buildTree = (roots, items) => {
    return roots && roots.map(r => {
        const item = items.find(x => x.id == r);
        console.log(r, item, items);
        return (
          <Category
            key={item.id}
            id={item.id}
            title={item.title}
            onDelete={() => this.setState({openDeleteDialog: true, deletedId: r})}
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
      {/*<div className="CategoryTree-add">*/}
      {/*<Input value="New category" onChange={(e) => this.props.add(e.target.value)}/>*/}
      {/*</div>*/}
      <div className="CategoryTree-items">
        {tree}
      </div>

      {
        this.state.openDeleteDialog &&
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Remove</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Remove {this.state.deletedId}?
          </Modal.Body>

          <Modal.Footer>
            <ButtonGroup>
              <Button onClick={() => this.setState({openDeleteDialog: false, deletedId: -1})}>Close</Button>
              <Button bsStyle="danger" onClick={() => {
                this.props.remove(this.state.deletedId)
                this.setState({openDeleteDialog: false, deletedId: -1})
              }}>Save changes</Button>
            </ButtonGroup>
          </Modal.Footer>

        </Modal.Dialog>
      }
    </div>
  }
}

CategoryTree.propTypes = {
  roots: PropTypes.array,
  items: PropTypes.array,
};
