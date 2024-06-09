declare interface NewTodoFormProps {
    setTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

declare type TodoItem = {
    id: number;
    title: string;
    description: string;
    updatedAt: string;
    position: { x: number, y: number, z: number };
    status: string;
};

declare interface TodoProps {
    todo: TodoItem[];
    setTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}
