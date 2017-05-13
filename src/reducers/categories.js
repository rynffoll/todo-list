import {CATEGORY_ADD, CATEGORY_ADD_TO, CATEGORY_REMOVE, CATEGORY_UPDATE} from "../actions/constants";

function createCategory(id, title) {
  return {
    id,
    title
  }
}

function generateId(items) {
  if (items === undefined || items.length === 0) return 0;
  const ids = items.map(x => x.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

// todo: consider about removing accum arg
function getItemsForRemoving(items, id, accum) {
  const selectedItem = items.find(x => x.id === id);
  selectedItem.childs && selectedItem.childs.map(x => getItemsForRemoving(items, x, accum));
  accum.push(selectedItem.id);
}

const initialState = {
  roots: [],
  items: []
};

export function categories(state = initialState, action) {
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
      to.childs = to.childs !== undefined ? [...to.childs, id] : [id];
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
      let itemIdsForRemoving = [];
      getItemsForRemoving(state.items, action.id, itemIdsForRemoving);
      const updatedFilteredItems = state.items
        .filter(x => !itemIdsForRemoving.includes(x.id))
        .map(x => x.childs && x.childs.includes(action.id)
          ? {...x, childs: x.childs.filter(c => c !== action.id)}
          : x
        );

      return {
        roots: [
          ...filteredRoots
        ],
        items: [
          ...updatedFilteredItems,
        ]
      };
    }
    default:
      return state;
  }
}
