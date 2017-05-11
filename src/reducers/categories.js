import {CATEGORY_ADD, CATEGORY_ADD_TO, CATEGORY_REMOVE, CATEGORY_UPDATE} from "../actions/constants";

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
    case CATEGORY_ADD: {
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
    }
    case CATEGORY_ADD_TO: {
      const id = generateId(state.items);
      let to = state.items.find(x => x.id === action.id);
      to.childs = to.childs && [...to.childs, id] || [id];
      const filteredItems = state.items.filter(x => x.id !== action.id);
      return {
        ...state,
        items: [
          ...filteredItems,
          to,
          createCategory(id, action.title),
        ]
      };
    }
    case CATEGORY_UPDATE: {
      let updatedItem = state.items.find(x => x.id === action.id);
      updatedItem.title = action.title;
      const filteredItems = state.items.filter(x => x.id !== action.id);
      return {
        ...state,
        items: [
          ...filteredItems,
          updatedItem
        ]
      }
    }
    case CATEGORY_REMOVE: {
      const filteredRoots = state.roots.filter(x => x !== action.id);
      const removedItems = state.items.find(x => x.id === action.id);
      const removedIds = removedItems.childs && [...removedItems.childs, action.id] || [action.id];
      let filteredItems = state.items.filter(x => !removedIds.includes(x.id));
      filteredItems = filteredItems.map(x => x.childs && {
        ...x,
        childs: [...x.childs.filter(c => !removedIds.includes(c))]
      } || x);
      return {
        roots: [
          ...filteredRoots
        ],
        items: [
          ...filteredItems
        ]
      };
    }
    default:
      return state;
  }
}
