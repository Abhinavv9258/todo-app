"use client"; // Add this directive at the top

import React, { useState } from 'react';
import Todo from './Todo';

type TodoItem = {
  id: number;
  title: string;
  description: string;
  position: { x: number, y: number, z: number };
  status: 'completed' | 'pending';
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    // Initial todo items
  ]);

  const updateTodoPosition = (id: number, x: number, y: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, position: { ...todo.position, x, y } } : todo
      )
    );
  };

  const toggleTodoStatus = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' }
          : todo
      )
    );
  };

  return (
    <div className="grid gap-4">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          position={todo.position}
          status={todo.status}
          onUpdatePosition={updateTodoPosition}
          onToggleStatus={toggleTodoStatus}
        />
      ))}
    </div>
  );
};

export default TodoList;
