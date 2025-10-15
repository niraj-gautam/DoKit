import { Status, Todo } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  status: Status;
  todos: Todo[];
}

export const KanbanColumn = ({ status, todos }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status.code,
  });

  return (
    <div className="flex-shrink-0 w-80">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{status.label}</h3>
          <Badge variant="secondary">{todos.length}</Badge>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`space-y-3 min-h-[500px] p-4 rounded-xl transition-smooth ${
          isOver ? 'bg-accent/20 border-2 border-dashed border-accent' : 'bg-muted/30'
        }`}
      >
        <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <KanbanCard key={todo.id} todo={todo} />
          ))}
        </SortableContext>
        
        {todos.length === 0 && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};
