import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo'
import Todo from './Todo'
import './Comment.css'

const Comment=({productId })=> {
  const [todos, setTodos] = useState([]);

  const fetchTasks = async () => {
          const response = await fetch(`http://localhost:8000/tasks/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
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
              body: JSON.stringify({ text ,productId}),
          });

          if (response.ok) {
              fetchTasks();
          } else {
              console.error('Failed to add comment');
          }
  };

  const deleteTask = async (todo) => {
          const response = await fetch('http://localhost:8000/delete', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: todo.id ,productId}),
          });

          if (response.ok) {
              fetchTasks();
          } else {
              console.error('Failed to delete comment');
          }
  };

  const updateTask = async (todo) => {
          const response = await fetch('http://localhost:8000/update', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: todo.id, text: todo.text,productId }),
          });

          if (response.ok) {
              fetchTasks();
          } else {
              console.error('Failed to update comment');
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