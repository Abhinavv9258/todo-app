"use client"; // Add this directive at the top

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '../lib/utils';

type TodoProps = {
  id: number;
  title: string;
  description: string;
  position: { x: number, y: number, z: number };
  status: 'completed' | 'pending';
  onUpdatePosition: (id: number, x: number, y: number) => void;
  onToggleStatus: (id: number) => void;
};

const Todo: React.FC<TodoProps> = ({
  id,
  title,
  description,
  position,
  status,
  onUpdatePosition,
  onToggleStatus,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    setDragging(false);
    onUpdatePosition(id, info.point.x, info.point.y);
  };

  return (
    <motion.div
      className={cn('p-4 rounded shadow-lg', {
        'border-2 border-green-500': status === 'completed',
        'border-2 border-yellow-500': status === 'pending',
      })}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => onToggleStatus(id)}>
        {status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
      </button>
    </motion.div>
  );
};

export default Todo;
