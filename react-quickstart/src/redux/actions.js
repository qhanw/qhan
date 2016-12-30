/**
 * Created by Wang QiHan on 2016/11/30.
 */

// action 类型
export const COMPUTER_ADD = 'COMPUTER_ADD';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETED_TODO = 'COMPLETED_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// action 函数
export function computerAdd(num1, num2) {
  return {type: COMPUTER_ADD, arr: [num1, num2]}
}

export function addTodo(text) {
  return {type: ADD_TODO, text}
}

export function completedTodo(index) {
  return {type: COMPLETED_TODO, index}
}

export function setVisibilityFilter(filter) {
  return {type: SET_VISIBILITY_FILTER, filter}
}