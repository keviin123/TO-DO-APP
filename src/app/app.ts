import { Component } from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form';
import { TodoListComponent } from './components/todo-list/todo-list';
import { TodoFilterComponent } from './components/todo-filter/todo-filter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoFilterComponent,
    TodoListComponent
  ],
  template: `
    <div class="container py-4">
      <h1 class="mb-4">TO-DO App</h1>

      <app-todo-form></app-todo-form>
      <app-todo-filter></app-todo-filter>
      <app-todo-list></app-todo-list>
    </div>
  `
})
export class App {}

