import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';

type Filter = 'all' | 'pending' | 'completed' | 'favorites';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly STORAGE_KEY = 'todos';

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
      // no tiramos la app si falla storage
    }
  }

  private todos = signal<Todo[]>(this.loadFromStorage());
  private filter = signal<Filter>('all');

  // búsqueda por título
  private search = signal('');

  // aplica filtro + búsqueda
  filteredTodos = computed(() => {
    const f = this.filter();
    const search = this.search().toLowerCase();
    let t = this.todos();

    if (f === 'pending') t = t.filter((todo) => !todo.completed);
    if (f === 'completed') t = t.filter((todo) => todo.completed);
    if (f === 'favorites') t = t.filter((todo) => todo.favorite);

    if (search) {
      t = t.filter((todo) => todo.title.toLowerCase().includes(search));
    }

    return t;
  });

  getTodos() {
    return this.filteredTodos;
  }

  setFilter(filter: Filter) {
    this.filter.set(filter);
  }

  // ✅ para pintar botón activo desde el componente
  getFilter() {
    return this.filter;
  }

  setSearch(value: string) {
    this.search.set(value);
  }

  addTodo(title: string, startDate: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
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
    this.todos.update((t) => {
      const updated = t.map((todo) =>
        todo.id === id ? { ...todo, title: title.trim(), startDate } : todo
      );
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