import {CATEGORY_ADD, CATEGORY_ADD_TO, CATEGORY_REMOVE, CATEGORY_UPDATE} from "./constants";

export function add(title) {
  return {
    type: CATEGORY_ADD,
    title
  }
}

export function addTo(title, id) {
  return {
    type: CATEGORY_ADD_TO,
    id,
    title
  }
}

export function remove(id) {
  return {
    type: CATEGORY_REMOVE,
    id
  }
}

export function update(title, id) {
  return {
    type: CATEGORY_UPDATE,
    id,
    title
  }
}
