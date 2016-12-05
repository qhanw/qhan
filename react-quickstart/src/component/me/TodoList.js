/**
 * Created by Wang QiHan on 2016/12/1.
 */
import React,{Component, PropTypes} from 'react';

export default class TodoList extends Component{
  render(){
    return(
      <ul>
        {console.log(this.props)}
        {
          this.props.todos.map((todo, index) => <li
            key={index}
            onClick={()=> this.props.onTodoClick(index)}
            style={{
              textDecoration: todo.completed ? 'line-through': 'none',
              cursor: todo.completed ? 'default' : 'pointer'
            }}
          >
            {todo.text}
            </li>)
        }
      </ul>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}