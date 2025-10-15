import { useTodoStore } from '@/store/todoStore';
import { KanbanColumn } from './KanbanColumn';
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useState } from 'react';
import { Todo } from '@/types';
import { TodoCard } from './TodoCard';

export const TodoKanban = () => {
  const { todos, statuses, updateTodo } = useTodoStore();
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const handleDragStart = (event: any) => {
    const todo = todos.find((t) => t.id === event.active.id);
    setActiveTodo(todo || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTodo(null);
      return;
    }

    const todoId = active.id as string;
    const newStatusCode = over.id as string;

    updateTodo(todoId, { statusCode: newStatusCode });
    setActiveTodo(null);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full overflow-x-auto pb-6">
        {statuses.map((status) => {
          const columnTodos = todos.filter((todo) => todo.statusCode === status.code);
          return <KanbanColumn key={status.code} status={status} todos={columnTodos} />;
        })}
      </div>
      
      <DragOverlay>
        {activeTodo && (
          <div className="opacity-50">
            <TodoCard todo={activeTodo} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
