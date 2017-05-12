import {TASK_ADD, TASK_EDIT, TASK_TOGGLE} from "../actions/constants";

function createTask(id, title, category) {
  return {
    id,
    title,
    category
  }
}

function generateId(items) {
  const ids = items.map(x => x.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}


export function tasks(state = {}, action) {
  switch (action.type) {
    case TASK_ADD: {
      return {
        ...state,
        items: [
          createTask(generateId(state.items), action.title, action.category),
          ...state.items,
        ]
      }
    }
    case TASK_EDIT: {
      const updatedItems = state.items.map(x => x.id === action.item.id ? action.item : x);
      return {
        ...state,
        items: updatedItems
      }
    }
    case TASK_TOGGLE: {
      const updatedItems = state.items.map(x => x.id === action.id && {...x, done: !x.done} || x);
      return {
        ...state,
        items: updatedItems
      }
    }
    default:
      return state;
  }
}
