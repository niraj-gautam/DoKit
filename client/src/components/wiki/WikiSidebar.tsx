import { useWikiStore } from '@/store/wikiStore';
import { BookOpen, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const WikiSidebar = () => {
  const { getFilteredEntries, folders, selectedEntryId, selectedFolderId, setSelectedEntry, setSelectedFolder } = useWikiStore();
  const entries = getFilteredEntries();

  const getEntriesByFolder = (folderId?: string) => {
    return entries.filter((entry) => entry.folderId === folderId);
  };

  return (
    <aside className="w-64 border-r border-border bg-card/30">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {folders.map((folder) => {
            const folderEntries = getEntriesByFolder(folder.id);
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
                    {folderEntries.length}
                  </span>
                </Button>

                <div className="pl-6 space-y-1">
                  {folderEntries.map((entry) => (
                    <Button
                      key={entry.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'w-full justify-start gap-2 text-sm',
                        selectedEntryId === entry.id && 'bg-accent text-accent-foreground'
                      )}
                      onClick={() => setSelectedEntry(entry.id)}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span className="truncate">{entry.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Uncategorized entries */}
          {getEntriesByFolder(undefined).length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Uncategorized
              </div>
              {getEntriesByFolder(undefined).map((entry) => (
                <Button
                  key={entry.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 text-sm',
                    selectedEntryId === entry.id && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => setSelectedEntry(entry.id)}
                >
                  <BookOpen className="w-3 h-3" />
                  <span className="truncate">{entry.title}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};
