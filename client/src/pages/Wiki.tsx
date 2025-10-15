import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWikiStore } from '@/store/wikiStore';
import { WikiSidebar } from '@/components/wiki/WikiSidebar';
import { WikiViewer } from '@/components/wiki/WikiViewer';
import { WikiDialog } from '@/components/wiki/WikiDialog';
import { motion } from 'framer-motion';

const Wiki = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { searchQuery, setSearchQuery, selectedEntryId, entries } = useWikiStore();
  const selectedEntry = entries.find((e) => e.id === selectedEntryId);

  return (
    <div className="h-full flex">
      <WikiSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="p-6 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <h1 className="text-3xl font-bold mb-3">Wiki</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wiki entries..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button onClick={() => setDialogOpen(true)} className="gap-2 ml-4">
              <Plus className="w-4 h-4" />
              New Entry
            </Button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          {selectedEntry ? (
            <WikiViewer entry={selectedEntry} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <p className="text-2xl font-semibold text-muted-foreground mb-2">No entry selected</p>
              <p className="text-muted-foreground">Select an entry from the sidebar or create a new one</p>
            </div>
          )}
        </motion.div>
      </div>

      <WikiDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Wiki;
