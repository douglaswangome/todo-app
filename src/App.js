import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Add from './components/modals/Add';
import Todo from "./components/Todo";
import sampleTodos from './sampletodos';

const App = () => {
  const [todos, setTodos] = useState(sampleTodos);
  const [count, setCount] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  const addCount = () => {
    setCount(prevCount => prevCount + 1);
  }

  const todo = todos.map(currentTodo => <Todo key={currentTodo.id} {...currentTodo} addCount={addCount} />);

  useEffect(() => {
    setTodos(sampleTodos);
  }, [count])

  return (
    <>
    <div className="app">
      <Header />
      {todo}
      <button className="add-todo" onClick={() => setShowAddModal(true)}>
        <span>Add To-Do</span>
      </button>
    </div>
    <Add addCount={addCount} show={showAddModal} hideModal={() => setShowAddModal(false)} />
    </>
  );
}

export default App