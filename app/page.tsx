import React from 'react';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewTodoForm';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <TodoList />
      <NewTodoForm />
    </div>
  );
};

export default Home;
