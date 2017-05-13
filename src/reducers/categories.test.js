import {categories as reducer} from './categories';
import {categories as actionCreator} from '../actions';

describe('categories reducer', () => {

  const initialState = {
    items: [],
    roots: [],
  };

  // it('should return initial state', () => {
  //   expect(
  //     reducer(undefined, {})
  //   ).toEqual(initialState)
  // });

  const stateWithOneRootItem = {
    roots: [0],
    items: [{id: 0, title: "Category0", childs: []}],
  };

  it('should handle CATEGORY_ADD', () => {
    expect(
      reducer(initialState, actionCreator.add("Category0"))
    ).toEqual(stateWithOneRootItem)
  });


  it('should handle CATEGORY_UPDATE', () => {
    expect(
      reducer(stateWithOneRootItem, actionCreator.update(0, "Category0 Updated"))
    ).toEqual({
      roots: [0],
      items: [{id: 0, title: "Category0 Updated", childs: []}],
    })
  });

  const stateWithOneRootItemAndOneNestedItem = {
    roots: [0],
    items: [
      {id: 0, title: "Category0", childs: [1]},
      {id: 1, title: "Category0-0", childs: []},
    ],
  };

  it('should handle CATEGORY_ADD_TO', () => {
    expect(
      reducer(stateWithOneRootItem, actionCreator.addTo(0, "Category0-0"))
    ).toEqual(stateWithOneRootItemAndOneNestedItem)
  });

  it('should handle CATEGORY_REMOVE (top-level item without childs)', () => {
    expect(
      reducer(stateWithOneRootItem, actionCreator.remove(0))
    ).toEqual(initialState)
  });

  it('should handle CATEGORY_REMOVE (top-level item with childs)', () => {
    expect(
      reducer(stateWithOneRootItemAndOneNestedItem, actionCreator.remove(0))
    ).toEqual(initialState)
  });

  it('should handle CATEGORY_REMOVE (nested item)', () => {
    expect(
      reducer(stateWithOneRootItemAndOneNestedItem, actionCreator.remove(1))
    ).toEqual(stateWithOneRootItem)
  });
});
