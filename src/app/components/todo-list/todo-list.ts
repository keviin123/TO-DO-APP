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

  // Estado de edición
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

  saveEdit() {
    if (!this.editingId) return;

    const title = this.editTitle.trim();
    if (title.length < 3 || !this.editStartDate) return;

    this.todoService.updateTodo(this.editingId, title, this.editStartDate);
    this.cancelEdit();
  }
}
