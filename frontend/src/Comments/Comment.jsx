import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo'
import Todo from './Todo'
import './Comment.css'

const Comment=()=> {
  const [todos, setTodos] = useState([]);

  const fetchTasks = async () => {
          const response = await fetch('http://localhost:8000/tasks');
          const data = await response.json();
          setTodos(data);
  };

  useEffect(() => {
      fetchTasks();
  }, []);

  const handler = async (text) => {
          const response = await fetch('http://localhost:8000/add', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text }),
          });

          if (response.ok) {
              fetchTasks();
          } else {
              console.error('Failed to add task');
          }
  };

  const deleteTask = async (todo) => {
          const response = await fetch('http://localhost:8000/delete', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: todo.id }),
          });

          if (response.ok) {
              fetchTasks();
          } else {
              console.error('Failed to delete task');
          }
  };

  const updateTask = async (todo) => {
          const response = await fetch('http://localhost:8000/update', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: todo.id, text: todo.text }),
          });

          if (response.ok) {
              fetchTasks();
          } else {
              console.error('Failed to update task');
          }
  };

  return (
      <div>
          <AddTodo onAddTodo={handler} />
          <Todo todos={todos} onDelete={deleteTask} onUpdate={updateTask} />
      </div>
  );
};

export default Comment