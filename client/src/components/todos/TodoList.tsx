import { useTodoStore } from '@/store/todoStore';
import { TodoCard } from './TodoCard';

export const TodoList = () => {
  const { todos } = useTodoStore();

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-2xl font-semibold text-muted-foreground mb-2">No tasks yet</p>
        <p className="text-muted-foreground">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
