export interface Priority {
  code: string;
  label: string;
  color: string;
}

export interface Status {
  code: string;
  label: string;
  color: string;
}

export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  statusCode: string;
  priorityCode: string;
  tags: Tag[];
  subtasks: Todo[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completed: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  children?: Folder[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WikiEntry {
  id: string;
  title: string;
  description: string;
  body: string;
  tags: Tag[];
  folderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ViewMode = 'list' | 'kanban';
export type ThemeMode = 'light' | 'dark';
