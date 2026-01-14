import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';

export type Filter = 'all' | 'pending' | 'completed' | 'favorites';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly STORAGE_KEY = 'todos';

  // ---- STORAGE ----
  private loadFromStorage(): Todo[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];

      const parsed = JSON.parse(data) as any[];

      return parsed.map((t) => ({
        id: t.id,
        title: t.title,
        startDate: t.startDate,
        completed: !!t.completed,
        favorite: !!t.favorite,
      })) as Todo[];
    } catch {
      return [];
    }
  }

  private saveToStorage(todos: Todo[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Si el storage falla, no tiramos la app
    }
  }

  // ---- STATE ----
  private todos = signal<Todo[]>(this.loadFromStorage());
  private filter = signal<Filter>('all');
  private search = signal('');

  // ---- SELECTORS ----
  /** Lista filtrada (filtro + búsqueda) */
  filteredTodos = computed(() => {
    const f = this.filter();
    const q = this.search().toLowerCase().trim();

    let t = this.todos();

    if (f === 'pending') t = t.filter((todo) => !todo.completed);
    if (f === 'completed') t = t.filter((todo) => todo.completed);
    if (f === 'favorites') t = t.filter((todo) => todo.favorite);

    if (q) t = t.filter((todo) => todo.title.toLowerCase().includes(q));

    return t;
  });

  /** Para el componente de lista (tu HTML usa todos() ) */
  getTodos() {
    return this.filteredTodos;
  }

  /** Para resaltar el filtro activo en botones */
  getFilter() {
    return this.filter.asReadonly();
  }

  // ---- STATS (panel izquierdo) ----
  pendingCount = computed(() => this.todos().filter((t) => !t.completed).length);

  completedCount = computed(() => this.todos().filter((t) => t.completed).length);

  favoritesCount = computed(() => this.todos().filter((t) => t.favorite).length);

  progressPercent = computed(() => {
    const total = this.todos().length;
    if (!total) return 0;
    const done = this.todos().filter((t) => t.completed).length;
    return Math.round((done / total) * 100);
  });

  // ---- ACTIONS ----
  setFilter(filter: Filter) {
    this.filter.set(filter);
  }

  setSearch(value: string) {
    this.search.set((value ?? '').trim());
  }

  addTodo(title: string, startDate: string) {
    const cleanTitle = title.trim();

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: cleanTitle,
      startDate,
      completed: false,
      favorite: false,
    };

    this.todos.update((t) => {
      const updated = [newTodo, ...t];
      this.saveToStorage(updated);
      return updated;
    });
  }

  toggleTodo(id: string) {
    this.todos.update((t) => {
      const updated = t.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.saveToStorage(updated);
      return updated;
    });
  }

  updateTodo(id: string, title: string, startDate: string) {
    const cleanTitle = title.trim();

    this.todos.update((t) => {
      const updated = t.map((todo) =>
        todo.id === id ? { ...todo, title: cleanTitle, startDate } : todo
      );
      this.saveToStorage(updated);
      return updated;
    });
  }

  deleteTodo(id: string) {
    this.todos.update((t) => {
      const updated = t.filter((todo) => todo.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  toggleFavorite(id: string) {
    this.todos.update((t) => {
      const updated = t.map((todo) =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      );
      this.saveToStorage(updated);
      return updated;
    });
  }
}