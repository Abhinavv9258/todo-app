"use client";

import React, { useEffect, useState } from 'react';
import Todo from './Todo';

export type TodoItem = {
    id: number;
    title: string;
    description: string;
    updatedAt: string;
    position: { x: number, y: number, z: number };
    status: string;
};

const TodoList: React.FC = () => {
    const [todo, setTodo] = useState<TodoItem[]>([]);

    const fetchTodo = async () => {
        try {
            const response = await fetch('/api/todo');
            const data = await response.json();
            if (Array.isArray(data.todo)) {
                setTodo(data.todo);
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Failed to fetch todo:', error);
        }
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    const updateTodoPosition = async (id: number, x: number, y: number, z: number) => {
        try{
            const response = await fetch(`/api/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, position: { x, y, z } }),
            });
            if (response.ok) {
                setTodo((prevTodo) =>
                    prevTodo.map((todo) =>
                        todo.id === id ? { ...todo, position: { ...todo.position, x, y, z } } : todo
                    )
                );
            } else {
                console.error('Failed to update todo position:', await response.text());
            }
        } catch (error) {
            console.error('Error update todo position:', error);
        }

    };

    const toggleTodoStatus = async (id: number) => {
        try {
            const response = await fetch(`/api/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: todo.find(item => item.id === id)?.status === 'completed' ? 'pending' : 'completed'  }), 
            });

            if (response.ok) {
                setTodo((prevTodo) =>
                    prevTodo.map((todo) =>
                        todo.id === id
                            ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' }
                            : todo
                    )
                );
            } else {
                console.error('Failed to toggle todo status:', await response.text());
            }
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            const response = await fetch(`/api/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            },
            );
            if (response.ok) {
                setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
            } else {
                console.error('Failed to delete todo:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="grid gap-4">
            {todo.map((todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    position={todo.position}
                    status={todo.status}
                    updatedAt={todo.updatedAt}
                    onUpdatePosition={updateTodoPosition}
                    onToggleStatus={toggleTodoStatus}
                    onDeleteTodo={handleDeleteTodo}
                />

            ))}
        </div>
    );
};

export default TodoList;
