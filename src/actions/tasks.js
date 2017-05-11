import {TASK_ADD, TASK_DONE, TASK_MOVE} from "./constants";

export function add(category, title) {
  return {
    type: TASK_ADD,
    category,
    title
  }
}

export function done(id) {
  return {
    type: TASK_DONE,
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
