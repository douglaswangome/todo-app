import { useEffect, useState } from "react";
import './Add.css';
import sampleTodos from "../../sampletodos";

const Add = (props) => {
  const [formData, setFormData] = useState({
    active: false,
    completed: false,
    description: "",
    title: "",
  });
  const [showWarning, setShowWarning] = useState(false);

  const updateFields = (event) => {
    const {name, type, checked, value} = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    });
  }

  const clearFields = (formData) => {
    formData.title = "";
    formData.description = "";
    formData.active = false;
  }

  const addTodo = (formData) => {
    const {active, completed, description, title} = formData;

    if (title === "") {
      setShowWarning(true);
    } else {
      sampleTodos.push({
        id: sampleTodos[sampleTodos.length - 1].id === sampleTodos.length + 1 ? sampleTodos.length + 2 : sampleTodos.length + 1,
        active: active,
        completed: completed,
        description: description,
        title: title
      });
      
      props.addCount();
      props.hideModal();
      clearFields(formData);
      setShowWarning(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  }, [showWarning]);

  return (
    <div 
      className={props.show ? "add" : "add inactive"}
      onClick={() => {
        props.hideModal(); 
        setShowWarning(false)
      }}
    >
      <div 
        className="add-form"
        onClick={e => e.stopPropagation()}
      >
        <span className="title">Add To-Do</span>
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
        <div className="checkbox">
          <input
            id="active"
            name="active"
            checked={formData.active}
            onChange={updateFields}
            type="checkbox"
          />
          <label htmlFor="active">Active</label>
        </div>
        <button onClick={() => addTodo(formData)}>
          <span>Add</span>
        </button>
        {showWarning && <span className="warning">Can't add a to-do with empty title!!</span>}
      </div>
    </div>
  );
}

export default Add;