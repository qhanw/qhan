/**
 * Created by Wang QiHan on 2016/11/30.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo, completedTodo, setVisibilityFilter, VisibilityFilters} from '../../redux/actions'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'


class Me extends Component {
  render() {
    const {dispatch, todos, visibilityFilter} = this.props;
    return (
      <div>
        <AddTodo onAddClick={text => dispatch(addTodo(text))}/>
        <TodoList todos={todos} onTodoClick={index => dispatch(completedTodo(index))}/>
        <Footer filter={visibilityFilter} onFilterChange={filter => dispatch(setVisibilityFilter(filter))}/>
      </div>
    );
  }
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case  VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default: return todos;
  }
}

const mapStateToProps = (state) => {
  return {
    todos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(mapStateToProps)(Me);

