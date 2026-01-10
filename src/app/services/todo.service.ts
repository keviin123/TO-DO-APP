import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos = signal<Todo[]>([]);

  getTodos() {
    return this.todos;
  }

  addTodo(title: string, startDate: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      startDate,
      completed: false
    };

    this.todos.update(t => [newTodo, ...t]);
  }

  toggleTodo(id: string) {
    this.todos.update(t =>
      t.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
}