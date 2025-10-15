import { useNoteStore } from '@/store/noteStore';
import { Folder, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const NotesSidebar = () => {
  const { notes, folders, selectedNoteId, selectedFolderId, setSelectedNote, setSelectedFolder } = useNoteStore();

  const getNotesByFolder = (folderId?: string) => {
    return notes.filter((note) => note.folderId === folderId);
  };

  return (
    <aside className="w-64 border-r border-border bg-card/30">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {folders.map((folder) => {
            const folderNotes = getNotesByFolder(folder.id);
            const isSelected = selectedFolderId === folder.id;

            return (
              <div key={folder.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-2 font-medium',
                    isSelected && 'bg-accent'
                  )}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <Folder className="w-4 h-4" />
                  {folder.name}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {folderNotes.length}
                  </span>
                </Button>

                <div className="pl-6 space-y-1">
                  {folderNotes.map((note) => (
                    <Button
                      key={note.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'w-full justify-start gap-2 text-sm',
                        selectedNoteId === note.id && 'bg-accent text-accent-foreground'
                      )}
                      onClick={() => setSelectedNote(note.id)}
                    >
                      <FileText className="w-3 h-3" />
                      <span className="truncate">{note.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Uncategorized notes */}
          {getNotesByFolder(undefined).length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Uncategorized
              </div>
              {getNotesByFolder(undefined).map((note) => (
                <Button
                  key={note.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 text-sm',
                    selectedNoteId === note.id && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => setSelectedNote(note.id)}
                >
                  <FileText className="w-3 h-3" />
                  <span className="truncate">{note.title}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};
