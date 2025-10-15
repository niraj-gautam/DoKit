import { create } from 'zustand';
import { Note, Folder } from '@/types';

const mockFolders: Folder[] = [
  { id: 'f1', name: 'Personal', children: [] },
  { id: 'f2', name: 'Work', children: [] },
  { id: 'f3', name: 'Projects', children: [] },
];

const mockNotes: Note[] = [
  {
    id: 'n1',
    title: 'Meeting Notes',
    content: '<h2>Team Standup - Jan 15</h2><p>Discussed project timeline and deliverables.</p>',
    folderId: 'f2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'n2',
    title: 'Ideas for App',
    content: '<h2>Feature Ideas</h2><ul><li>Dark mode toggle</li><li>Export functionality</li></ul>',
    folderId: 'f3',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date(),
  },
  {
    id: 'n3',
    title: 'Shopping List',
    content: '<ul><li>Groceries</li><li>Office supplies</li><li>Books</li></ul>',
    folderId: 'f1',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date(),
  },
];

interface NoteStore {
  notes: Note[];
  folders: Folder[];
  selectedNoteId: string | null;
  selectedFolderId: string | null;
  setSelectedNote: (id: string | null) => void;
  setSelectedFolder: (id: string | null) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addFolder: (folder: Omit<Folder, 'id'>) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: mockNotes,
  folders: mockFolders,
  selectedNoteId: null,
  selectedFolderId: null,
  setSelectedNote: (id) => set({ selectedNoteId: id }),
  setSelectedFolder: (id) => set({ selectedFolderId: id }),
  addNote: (note) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          ...note,
          id: `n${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  addFolder: (folder) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          ...folder,
          id: `f${Date.now()}`,
        },
      ],
    })),
}));
