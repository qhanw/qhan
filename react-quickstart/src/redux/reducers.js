/**
 * Created by EVEN on 2016/11/30.
 */

import { combineReducers } from 'redux';
import { COMPUTER_ADD, ADD_TODO, COMPLETED_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';

const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
  switch (action.type){
    case ADD_TODO:
      return [...state,{text:action.text, completed: false}]

    case COMPLETED_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {completed:true}),
        ...state.slice(action.index+1)
      ]

    default: return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type){
    case SET_VISIBILITY_FILTER:
      console.log(action)
      return action.filter
    default:
      return state
  }
}

function computer(state = '', action) {
  switch (action.type){
    case COMPUTER_ADD:
      return action.arr[0] + action.arr[1]
    default: return state
  }
}


const todoApp = combineReducers({
  todos,
  visibilityFilter,
  computer
})
export default todoApp