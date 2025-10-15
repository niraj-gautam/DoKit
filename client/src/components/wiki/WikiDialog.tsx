import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useWikiStore } from '@/store/wikiStore';
import { toast } from 'sonner';

interface WikiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WikiDialog = ({ open, onOpenChange }: WikiDialogProps) => {
  const { addEntry } = useWikiStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    addEntry({
      title: title.trim(),
      description: description.trim(),
      body: '<p>Start writing your wiki content...</p>',
      tags: [],
    });

    toast.success('Wiki entry created successfully!');
    setTitle('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Wiki Entry</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter entry title..."
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description..."
              className="mt-1.5 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Entry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
