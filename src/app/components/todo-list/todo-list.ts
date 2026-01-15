// src/app/components/todo-list/todo-list.ts
import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodoListComponent {
  public todoService = inject(TodoService);

  // getTodos() devuelve un computed => Signal<Todo[]>
  todos: Signal<Todo[]> = this.todoService.getTodos();

  editingId: string | null = null;
  editTitle = '';
  editStartDate = '';

  startEdit(todo: Todo) {
    this.editingId = todo.id;
    this.editTitle = todo.title;
    this.editStartDate = todo.startDate;
  }

  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
    this.editStartDate = '';
  }

  delete(todoId: string) {
    const ok = confirm('¿Seguro que deseas eliminar esta tarea?');
    if (!ok) return;
    this.todoService.deleteTodo(todoId);
  }

  openDatePicker(input: HTMLInputElement) {
    input.showPicker?.();
    input.focus();
  }

  saveEdit() {
    if (!this.editingId) return;

    const title = this.editTitle.trim();
    if (title.length < 3 || !this.editStartDate) return;

    this.todoService.updateTodo(this.editingId, title, this.editStartDate);
    this.cancelEdit();
  }
}