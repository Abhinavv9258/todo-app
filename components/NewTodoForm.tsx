"use client";

import React, { useState, FormEvent } from "react";

const NewTodoForm: React.FC = () => {
    const [description, setDescription] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (description.trim() === "") return;

        const getRandomPosition = (max: number) => Math.floor(Math.random() * max);
        const position = {
            x: getRandomPosition(100),
            y: getRandomPosition(100),
            z: getRandomPosition(100),
        };

        const response = await fetch("/api/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "",
                description,
                position,
                status: "pending",
            }),
        });
        if (response.ok) {
            const newTodo = await response.json();
            setDescription("");
            window.location.reload();
        } else {
            console.error("Failed to create todo:", await response.text());
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2 items-center">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo..."
                    className="block w-1/2 shadow-lg min-w-48 rounded-md border-0 py-1.5 pl-5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </form>
        </div>
    );
};

export default NewTodoForm;
