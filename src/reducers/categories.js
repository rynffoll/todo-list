import {CATEGORY_ADD, CATEGORY_ADD_TO, CATEGORY_REMOVE, CATEGORY_UPDATE} from "../actions/constants";

function createCategory(id, title) {
  return {
    id,
    title,
    childs: []
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
  roots: [0],
  items: [
    {id: 0, title: "Category0", childs: [1, 2, 3]},
    {id: 1, title: "Category1", childs: []},
    {id: 2, title: "Category2", childs: [4]},
    {id: 3, title: "Category3"},
    {id: 4, title: "Category4", childs: [5, 6]},
    {id: 5, title: "Category5"},
    {id: 6, title: "Category6"},
  ]
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
      const to = state.items.find(x => x.id === action.id);
      const updatedItem = to.childs !== undefined
        ? {...to, childs: [...to.childs, id]}
        : {...to, childs: [id]};
      const filteredItems = state.items.filter(x => x.id !== action.id);
      return {
        ...state,
        items: [
          ...filteredItems,
          updatedItem,
          createCategory(id, action.title),
        ]
      };
    }
    case CATEGORY_UPDATE: {
      const item = state.items.find(x => x.id === action.id);
      const updatedItem = item.title === action.title
        ? item
        : {...item, title: action.title};
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
