"use client";

import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewTodoForm';

const Home: React.FC = () => {
  const [todo, setTodo] = useState<TodoItem[]>([]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <TodoList todo={todo} setTodo={setTodo} />
      <NewTodoForm setTodo={setTodo} />
    </div>
  );
};

export default Home;
