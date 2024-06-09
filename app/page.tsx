"use client";

import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewTodoForm';

const Home: React.FC = () => {
    const [todo, setTodo] = useState<TodoItem[]>([]);
    return (
        <div className="h-screen w-screen bg-dot-gray-300 text-white">
            <TodoList todo={todo} setTodo={setTodo} />
            <NewTodoForm setTodo={setTodo} />
        </div>
    );
};

export default Home;