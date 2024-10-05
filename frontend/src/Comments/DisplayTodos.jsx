import React, { useState } from 'react';

const DisplayTodos = ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleUpdate = () => {
      const confirmEditing = window.confirm("Do you really want to edit it");
      if(confirmEditing){
        onUpdate({ ...todo, text: newText });
        setIsEditing(false);
      }
      else{
        onUpdate({ ...todo});
        setIsEditing(false);
      }
        
    };
    const handleDelete = () => {
      const confirmDelete = window.confirm("Do you really want to delete this todo?");
      if (confirmDelete) {
          onDelete(todo);
      }
  };

    return (
        <li className='tot'>
            {isEditing ? (
                <>
                    <input
                        type='text'
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <button className='com' onClick={handleUpdate}>Save</button>
                    <button className='com' onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    {todo.text}
                    <button className='com' onClick={() => setIsEditing(true)}>Edit</button>
                    <button className='com' onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
};

export default DisplayTodos;
