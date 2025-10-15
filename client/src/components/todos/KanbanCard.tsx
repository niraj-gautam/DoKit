import { Todo } from '@/types';
import { useTodoStore } from '@/store/todoStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

interface KanbanCardProps {
  todo: Todo;
}

export const KanbanCard = ({ todo }: KanbanCardProps) => {
  const { priorities } = useTodoStore();
  const priority = priorities.find((p) => p.code === todo.priorityCode);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-smooth"
    >
      <h4 className="font-semibold mb-2">{todo.title}</h4>
      {todo.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{todo.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {priority && (
          <Badge variant="outline" style={{ borderColor: priority.color, color: priority.color }} className="text-xs">
            {priority.label}
          </Badge>
        )}
        {todo.tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" className="text-xs">
            {tag.label}
          </Badge>
        ))}
        {todo.dueDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Calendar className="w-3 h-3" />
            {format(todo.dueDate, 'MMM dd')}
          </div>
        )}
      </div>
    </Card>
  );
};
