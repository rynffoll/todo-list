import {TASK_ADD, TASK_TOGGLE, TASK_MOVE, TASK_EDIT} from "./constants";

export function add(category, title) {
  return {
    type: TASK_ADD,
    category,
    title
  }
}

export function toggle(id) {
  return {
    type: TASK_TOGGLE,
    id
  }
}

export function edit(item) {
  return {
    type: TASK_EDIT,
    item
  }
}

export function move(id, category) {
  return {
    type: TASK_MOVE,
    id,
    category
  }
}
