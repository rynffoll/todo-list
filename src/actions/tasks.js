import {TASK_ADD, TASK_TOGGLE, TASK_MOVE} from "./constants";

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

export function move(id, category) {
  return {
    type: TASK_MOVE,
    id,
    category
  }
}
