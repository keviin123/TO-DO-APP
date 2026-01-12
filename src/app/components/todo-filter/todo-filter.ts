import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter.html',
  styleUrls: ['./todo-filter.scss'],
})
export class TodoFilterComponent {
  constructor(private todoService: TodoService) {}

  setAll() {
    this.todoService.setFilter('all');
  }

  setPending() {
    this.todoService.setFilter('pending');
  }

  setCompleted() {
    this.todoService.setFilter('completed');
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.todoService.setSearch(value);
  }
}
