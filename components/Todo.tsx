import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
import { format } from 'date-fns-tz';

type TodoProps = {
    id: number;
    title: string;
    description: string;
    position: { x: number; y: number; z: number };
    status: string;
    updatedAt: string;
    onUpdatePosition: (id: number, x: number, y: number, z: number) => void;
    onToggleStatus: (id: number) => void;
    onDeleteTodo: (id: number) => void;
};

const Todo: React.FC<TodoProps> = ({
    id,
    title,
    description,
    position,
    status,
    updatedAt,
    onUpdatePosition,
    onToggleStatus,
    onDeleteTodo,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const updatedAtIST = format(new Date(updatedAt), 'yyyy-MM-dd hh:mm a', { timeZone: 'Asia/Kolkata' });
    const descriptionLength = description.length;
    const descriptionWidth = descriptionLength * 10;
    const timeLength = updatedAt.length;
    const timeWidth = timeLength * 10;
    const width = Math.max(descriptionWidth, timeWidth);

    const x = useMotionValue(position.x);
    const y = useMotionValue(position.y);
    const z = useMotionValue(position.z);

    const dragConstraints = {
        left: 0,
        right: window.innerWidth - width,
        top: 0,
        bottom: window.innerHeight - 100,
    };

    const handleDeleteTodo = () => {
        onDeleteTodo(id);
    };

    const handleCheckboxChange = () => {
        onToggleStatus(id);
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
        setIsDragging(false);
        x.set(info.point.x);
        y.set(info.point.y);
        z.set(isDragging ? Date.now() + 9999 : position.z);
        onUpdatePosition(id, info.point.x, info.point.y, isDragging ? Date.now() + 9999 : position.z);
    };

    return (
        <motion.div
            className={`p-4 rounded bg-white bg-opacity shadow-lg border-2
                ${status === 'completed' ? 'border-green-500' : 'border-yellow-500'}  border-dashed`}
            drag
            dragElastic={1}
            dragConstraints={dragConstraints}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
                zIndex: isDragging ? Date.now() + 9999 : position.z,
                width: `${width}px`,
                position: 'absolute',
                x: position.x,
                y: position.y,
            }}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-start space-y-3 flex-col">
                    <p className="font-bold text-black">{description}</p>
                    <p className="text-sm text-gray-500">{updatedAtIST}</p>
                </div>
                <div className="flex items-center space-y-4 flex-col">
                    <div className="text-red-500 rounded-3xl p-0 m-0 ">
                        <svg onClick={handleDeleteTodo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-red-700 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <input
                        type="checkbox"
                        checked={status === 'completed'}
                        onChange={handleCheckboxChange}
                        className="size-4 m-0 p-0"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Todo;
