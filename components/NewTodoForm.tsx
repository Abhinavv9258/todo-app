"use client"; // Add this directive at the top

import React, { useState, FormEvent } from 'react';

const NewTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('title: ',title);
    console.log('description: ',description);
    event.preventDefault();
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, position: { x: 0, y: 0, z: 0 }, status: 'pending' }),
    });
    console.log('response: ',response);

    if (response.ok) {
      const newTodo = await response.json();
      console.log('New todo created:', newTodo);
      setTitle('');
      setDescription('');
    } else {
      console.error('Failed to create todo:', await response.text());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border-b p-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border-b p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Todo
      </button>
    </form>
  );
};

export default NewTodoForm;
