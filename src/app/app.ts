import { Component, OnInit } from '@angular/core';
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
      <header class="mb-4">
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3"
        >
          <div>
            <h1 class="mb-1">TO-DO App</h1>
            <p class="text-muted mb-0">
              Organiza tus tareas: pendientes, completadas y favoritas.
            </p>
          </div>

          <!-- SWITCH SOL / LUNA -->
          <div class="form-check form-switch theme-switch ms-sm-auto">
            <input
              class="form-check-input"
              type="checkbox"
              id="themeSwitch"
              [checked]="isDarkMode()"
              (change)="toggleTheme()"
            />
            <label class="form-check-label" for="themeSwitch">
              <span class="icon sun">☀</span>
              <span class="icon moon">☾</span>
            </label>
          </div>
        </div>
      </header>

      <main class="card card-body">
        <app-todo-form></app-todo-form>
        <app-todo-filter></app-todo-filter>
        <app-todo-list></app-todo-list>
      </main>
    </div>
  `
})
export class App implements OnInit {

  private readonly THEME_KEY = 'theme';

  ngOnInit(): void {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'dark') {
      document.body.classList.add('dark');
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
