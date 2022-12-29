import { useState } from 'react';
import sampleTodos from '../../sampletodos';
import './Edit.css';

const Edit = (props) => {
  const {id, description, title} = props;

  const todo = sampleTodos[id-1];

  const [formData, setFormData] = useState({
    id: id,
    description: description,
    title: title,
  });

  const updateFields = (event) => {
    const {name, value} = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const editObject = (formData) => {
    const {description, title} = formData;
    
    todo.description = description;
    todo.title = title;

    sampleTodos.splice(id-1, 1, todo);
    props.addClick();
    props.hideModal();
  }

  return (
    <div 
      className={props.show ? "edit" : "edit inactive"}
      onClick={() => props.hideModal()}
    >
      <div 
        className="edit-form"
        onClick={e => e.stopPropagation()}
      >
        <span className="title">Edit To-Do</span>
        <div>
          <span>Title</span>
          <input
            name="title"
            value={formData.title}
            onChange={updateFields}
            type="text"
          />
        </div>
        <div>
          <span>Description</span>
          <input
            name="description"
            value={formData.description}
            onChange={updateFields}
            type="text"
          />
        </div>
        <button onClick={() => editObject(formData)}>
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

export default Edit;