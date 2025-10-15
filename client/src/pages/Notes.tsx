import { useState } from 'react';
import { Plus, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNoteStore } from '@/store/noteStore';
import { NotesSidebar } from '@/components/notes/NotesSidebar';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { NoteDialog } from '@/components/notes/NoteDialog';
import { motion } from 'framer-motion';

const Notes = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { selectedNoteId, notes } = useNoteStore();
  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  return (
    <div className="h-full flex">
      <NotesSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Notes</h1>
              <p className="text-muted-foreground mt-1">Your personal knowledge base</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(true)} className="gap-2">
                <FolderPlus className="w-4 h-4" />
                New Folder
              </Button>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Note
              </Button>
            </div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          {selectedNote ? (
            <NoteEditor note={selectedNote} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <p className="text-2xl font-semibold text-muted-foreground mb-2">No note selected</p>
              <p className="text-muted-foreground">Select a note from the sidebar or create a new one</p>
            </div>
          )}
        </motion.div>
      </div>

      <NoteDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Notes;
