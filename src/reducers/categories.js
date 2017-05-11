import {CATEGORY_ADD, CATEGORY_REMOVE} from "../actions/constants";

function createCategory(id, title) {
  return {
    id,
    title
  }
}

function generateId(items) {
  const ids = items.map(x => x.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function categories(state = {}, action) {
  switch (action.type) {
    case CATEGORY_ADD:
      const id = generateId(state.items);
      return {
        roots: [
          id,
          ...state.roots
        ],
        items: [
          createCategory(id, action.title),
          ...state.items
        ]
      };
    case CATEGORY_REMOVE:
      debugger;
      const filteredRoots = state.roots.filter(x => x !== action.id);
      const removedItems = state.items.find(x => x.id === action.id);
      const removedIds = removedItems.childs && [...removedItems.childs, action.id] || [action.id];
      let filteredItems = state.items.filter(x => !removedIds.includes(x.id));
      filteredItems = filteredItems.map(x => x.childs && {...x, childs: [...x.childs.filter(c => !removedIds.includes(c))]} || x);
      return {
        roots: [
          ...filteredRoots
        ],
        items: [
          ...filteredItems
        ]
      };
    default:
      return state;
  }
}
