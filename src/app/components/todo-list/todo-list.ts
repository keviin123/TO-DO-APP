import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodoListComponent {

  todos: any;

  editingId: string | null = null;
  editTitle = '';
  editStartDate = '';

  constructor(public todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  startEdit(todo: any) {
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
    if (input.showPicker) {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  saveEdit() {
    if (!this.editingId) return;

    const title = this.editTitle.trim();
    if (title.length < 3 || !this.editStartDate) return;

    this.todoService.updateTodo(this.editingId, title, this.editStartDate);
    this.cancelEdit();
  }
}
