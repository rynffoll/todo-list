import {tasks as reducer} from './tasks';
import {tasks as actionCreator} from '../actions';

describe('tasks reducer', () => {

  const initialState = {
    items: [],
  };

  // it('should return initial state', () => {
  //   expect(
  //     reducer(undefined, {})
  //   ).toEqual(initialState)
  // });

  const stateWithOneItem = {
    items: [{id: 0, title: "Task0", category: 0, done: false, content: ""}],
  };

  it('should handle TASK_ADD', () => {
    expect(
      reducer(initialState, actionCreator.add(0, "Task0"))
    ).toEqual(stateWithOneItem)
  });

  it('should handle TASK_TOGGLE', () => {
    expect(
      reducer(stateWithOneItem, actionCreator.toggle(0))
    ).toEqual({
      items: [{id: 0, title: "Task0", category: 0, done: true, content: ""}],
    })
  });

  it('should handle TASK_UPDATE', () => {
    expect(
      reducer(stateWithOneItem, actionCreator.update({id: 0, title: "Task0 Updated"}))
    ).toEqual({
      items: [{id: 0, title: "Task0 Updated", category: 0, done: false, content: ""}],
    })
  });

});
