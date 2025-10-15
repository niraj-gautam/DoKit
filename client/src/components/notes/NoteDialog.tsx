import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNoteStore } from '@/store/noteStore';
import { toast } from 'sonner';

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NoteDialog = ({ open, onOpenChange }: NoteDialogProps) => {
  const { addNote, folders } = useNoteStore();
  const [title, setTitle] = useState('');
  const [folderId, setFolderId] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    addNote({
      title: title.trim(),
      content: '<p>Start writing...</p>',
      folderId,
    });

    toast.success('Note created successfully!');
    setTitle('');
    setFolderId(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="folder">Folder (optional)</Label>
            <Select value={folderId} onValueChange={setFolderId}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Note</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
