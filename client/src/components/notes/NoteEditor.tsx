import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Note } from '@/types';
import { useNoteStore } from '@/store/noteStore';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading2, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoteEditorProps {
  note: Note;
}

export const NoteEditor = ({ note }: NoteEditorProps) => {
  const { updateNote } = useNoteStore();

  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: note.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-8',
      },
    },
    onUpdate: ({ editor }) => {
      updateNote(note.id, { content: editor.getHTML() });
    },
  });

  useEffect(() => {
    if (editor && note.content !== editor.getHTML()) {
      editor.commands.setContent(note.content);
    }
  }, [note.id, note.content, editor]);

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, children }: any) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn('h-8 px-2', active && 'bg-accent')}
    >
      {children}
    </Button>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border bg-card/30 p-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => updateNote(note.id, { title: e.target.value })}
          className="text-2xl font-bold bg-transparent border-none outline-none w-full mb-4"
          placeholder="Untitled"
        />
        
        <div className="flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Enter URL:');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            active={editor.isActive('link')}
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Enter image URL:');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
          >
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
