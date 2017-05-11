import {TASK_ADD} from "../actions/constants";

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
    case TASK_ADD:
      return {
        items: [
          createTask(generateId(state.items), action.title, action.category),
          ...state.items,
        ]
      }
    default:
      return state;
  }
}
