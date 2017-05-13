import {TASK_ADD, TASK_TOGGLE, TASK_MOVE, TASK_UPDATE} from "./constants";

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

export function update(item) {
  return {
    type: TASK_UPDATE,
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
