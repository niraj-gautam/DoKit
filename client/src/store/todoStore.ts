import { create } from 'zustand';
import { Todo, Status, Priority, Tag, ViewMode } from '@/types';

// Mock data
const mockStatuses: Status[] = [
  { code: 'todo', label: 'To Do', color: 'hsl(var(--status-todo))' },
  { code: 'in-progress', label: 'In Progress', color: 'hsl(var(--status-in-progress))' },
  { code: 'done', label: 'Done', color: 'hsl(var(--status-done))' },
  { code: 'archived', label: 'Archived', color: 'hsl(var(--status-archived))' },
];

const mockPriorities: Priority[] = [
  { code: 'low', label: 'Low', color: 'hsl(var(--priority-low))' },
  { code: 'medium', label: 'Medium', color: 'hsl(var(--priority-medium))' },
  { code: 'high', label: 'High', color: 'hsl(var(--priority-high))' },
  { code: 'urgent', label: 'Urgent', color: 'hsl(var(--priority-urgent))' },
];

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create mockups and prototypes for the new marketing website',
    statusCode: 'in-progress',
    priorityCode: 'high',
    tags: [{ id: 't1', label: 'Design', color: '#8B5CF6' }],
    subtasks: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    completed: false,
  },
  {
    id: '2',
    title: 'Fix authentication bug',
    description: 'Users are reporting login issues on mobile devices',
    statusCode: 'todo',
    priorityCode: 'urgent',
    tags: [{ id: 't2', label: 'Bug', color: '#EF4444' }],
    subtasks: [],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date(),
    completed: false,
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Add examples and improve API reference',
    statusCode: 'done',
    priorityCode: 'low',
    tags: [{ id: 't3', label: 'Docs', color: '#3B82F6' }],
    subtasks: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
    completed: true,
  },
];

interface TodoStore {
  todos: Todo[];
  statuses: Status[];
  priorities: Priority[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodoComplete: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: mockTodos,
  statuses: mockStatuses,
  priorities: mockPriorities,
  viewMode: 'list',
  setViewMode: (mode) => set({ viewMode: mode }),
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleTodoComplete: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
