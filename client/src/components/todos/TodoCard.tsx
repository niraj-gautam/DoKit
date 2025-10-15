import { Todo } from '@/types';
import { useTodoStore } from '@/store/todoStore';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash2, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { toggleTodoComplete, deleteTodo, priorities, statuses } = useTodoStore();
  
  const priority = priorities.find((p) => p.code === todo.priorityCode);
  const status = statuses.find((s) => s.code === todo.statusCode);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <Card className="p-4 hover:shadow-md transition-smooth">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => toggleTodoComplete(todo.id)}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => deleteTodo(todo.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {status && (
                <Badge variant="outline" style={{ borderColor: status.color, color: status.color }}>
                  {status.label}
                </Badge>
              )}
              {priority && (
                <Badge variant="outline" style={{ borderColor: priority.color, color: priority.color }}>
                  {priority.label}
                </Badge>
              )}
              {todo.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.label}
                </Badge>
              ))}
              {todo.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {format(todo.dueDate, 'MMM dd')}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
