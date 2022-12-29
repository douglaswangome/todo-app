import { useState } from 'react';
import sampleTodos from '../sampletodos';
import './Todo.css';
import Edit from './modals/Edit';

const Todo = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { id, active, completed, description, title } = props;

  const [formData, setFormData] = useState({
    active: active,
    completed: completed,
  })

  const toggleActive = () => {
    setFormData(prevFormData => {
      return {...prevFormData, active: !prevFormData.active}
    });
  }

  const toggleComplete = () => {
    setFormData(prevFormData => {
      return {...prevFormData, completed: !prevFormData.completed}
    });
  }

  const deleteTodo = (id) => {
    sampleTodos.splice(id-1, 1);
    props.addCount();
  }

  return (
    <>
    <div className={formData.completed ? "todo completed" : "todo"}>
      <div className="done">
        <input
          checked={formData.completed}
          name="completed"
          onChange={toggleComplete}
          type="checkbox"
        />
      </div>
      <div className="details">
        <span className="title">{title}</span>
        <span className="desc">{description}</span>
      </div>
      <div 
        className={formData.active ? "active" : "active not-active"}
        // onClick={!formData.completed && toggleActive}
        onClick={!formData.completed ? toggleActive : null}
      ></div>
      <div className="buttons">
        <button onClick={!formData.completed ? () => setShowEditModal(true) : null}>
          <span>Edit</span>
        </button>
        <button onClick={!formData.completed ? () => deleteTodo(id) : null}>
          <span>Delete</span>
        </button>
      </div>
    </div>
    <Edit id={id} title={title} description={description} show={showEditModal} hideModal={() => setShowEditModal(false)} addClick={() => props.addCount()} />
    </>
  );
}

export default Todo;