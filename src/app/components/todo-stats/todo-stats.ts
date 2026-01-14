import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-stats.html',
  styleUrls: ['./todo-stats.scss'],
})
export class TodoStatsComponent {
  constructor(public todoService: TodoService) {}
}