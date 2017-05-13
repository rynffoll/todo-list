import {TASK_ADD, TASK_UPDATE, TASK_TOGGLE, TASK_MOVE} from "../actions/constants";

function createTask(id, title, category, done = false, content = "") {
  return {
    id,
    title,
    done,
    category,
    content
  }
}

function generateId(items) {
  if (items === undefined || items.length === 0) return 0;
  const ids = items.map(x => x.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

const initialState = {
  items: []
};

export function tasks(state = initialState, action) {
  switch (action.type) {
    case TASK_ADD: {
      const newTask = createTask(
        generateId(state.items),
        action.title,
        action.category
      );
      return {
        ...state,
        items: [
          newTask,
          ...state.items,
        ]
      }
    }
    case TASK_UPDATE: {
      const updatedItems = state.items.map(
        x => x.id === action.item.id
          ? {...x, ...action.item}
          : x
      );
      return {
        ...state,
        items: updatedItems
      }
    }
    case TASK_TOGGLE: {
      const updatedItems = state.items.map(
        x => x.id === action.id ? {...x, done: !x.done} : x
      );
      return {
        ...state,
        items: updatedItems
      }
    }
    case TASK_MOVE: {
      const updatedItems = state.items.map(
        x => x.id === action.id ? {...x, category: action.category} : x
      );
      return {
        ...state,
        items: updatedItems
      }
    }
    default:
      return state;
  }
}
