import React from 'react';
import DisplayTodos from './DisplayTodos';

const Todo = ({ todos, onDelete, onUpdate }) => {
    return (
        <ol className='n'>
            {todos.length === 0 ? (
                <p>No todos available</p>
            ) : (
                todos.map((todo) => (
                    <DisplayTodos key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
                ))
            )}
        </ol>
    );
};

export default Todo;
