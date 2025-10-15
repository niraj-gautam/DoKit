import { create } from 'zustand';
import { WikiEntry, Folder } from '@/types';

const mockWikiFolders: Folder[] = [
  { id: 'wf1', name: 'Documentation', children: [] },
  { id: 'wf2', name: 'Guides', children: [] },
  { id: 'wf3', name: 'Reference', children: [] },
];

const mockWikiEntries: WikiEntry[] = [
  {
    id: 'w1',
    title: 'Getting Started',
    description: 'Quick start guide for new users',
    body: '<h1>Welcome!</h1><p>This guide will help you get started with the app.</p>',
    tags: [{ id: 'wt1', label: 'Tutorial', color: '#10B981' }],
    folderId: 'wf2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
  },
  {
    id: 'w2',
    title: 'API Reference',
    description: 'Complete API documentation',
    body: '<h1>API Endpoints</h1><p>Full list of available endpoints and their usage.</p>',
    tags: [{ id: 'wt2', label: 'API', color: '#3B82F6' }],
    folderId: 'wf1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date(),
  },
];

interface WikiStore {
  entries: WikiEntry[];
  folders: Folder[];
  searchQuery: string;
  selectedEntryId: string | null;
  selectedFolderId: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedEntry: (id: string | null) => void;
  setSelectedFolder: (id: string | null) => void;
  addEntry: (entry: Omit<WikiEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, updates: Partial<WikiEntry>) => void;
  deleteEntry: (id: string) => void;
  getFilteredEntries: () => WikiEntry[];
}

export const useWikiStore = create<WikiStore>((set, get) => ({
  entries: mockWikiEntries,
  folders: mockWikiFolders,
  searchQuery: '',
  selectedEntryId: null,
  selectedFolderId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedEntry: (id) => set({ selectedEntryId: id }),
  setSelectedFolder: (id) => set({ selectedFolderId: id }),
  addEntry: (entry) =>
    set((state) => ({
      entries: [
        ...state.entries,
        {
          ...entry,
          id: `w${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  updateEntry: (id, updates) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updates, updatedAt: new Date() } : entry
      ),
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
  getFilteredEntries: () => {
    const { entries, searchQuery } = get();
    if (!searchQuery) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query) ||
        entry.tags.some((tag) => tag.label.toLowerCase().includes(query))
    );
  },
}));
