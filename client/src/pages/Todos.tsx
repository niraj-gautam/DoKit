import { useState } from 'react';
import { Plus, List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTodoStore } from '@/store/todoStore';
import { TodoList } from '@/components/todos/TodoList';
import { TodoKanban } from '@/components/todos/TodoKanban';
import { TodoDialog } from '@/components/todos/TodoDialog';
import { motion } from 'framer-motion';

const Todos = () => {
  const { viewMode, setViewMode } = useTodoStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">ToDos</h1>
            <p className="text-muted-foreground mt-1">Manage your tasks efficiently</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                List
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('kanban')}
                className="gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Kanban
              </Button>
            </div>
            
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-auto p-6"
      >
        {viewMode === 'list' ? <TodoList /> : <TodoKanban />}
      </motion.div>

      <TodoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Todos;
