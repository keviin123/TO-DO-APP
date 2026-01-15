// src/app/app.ts
import { Component, OnInit } from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form';
import { TodoListComponent } from './components/todo-list/todo-list';
import { TodoFilterComponent } from './components/todo-filter/todo-filter';
import { TodoStatsComponent } from './components/todo-stats/todo-stats';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoFormComponent, TodoFilterComponent, TodoListComponent, TodoStatsComponent],
  template: `
    <div class="app-shell">
      <div class="container py-4">
        <header class="app-header mb-4">
          <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
            <div>
              <h1 class="mb-1">TO-DO App</h1>
              <p class="text-muted mb-0">Organiza tus tareas: pendientes, completadas y favoritas.</p>
            </div>

            <!-- Switch -->
            <div class="form-check form-switch theme-switch ms-sm-auto">
              <input
                class="form-check-input"
                type="checkbox"
                id="themeSwitch"
                [checked]="isDarkMode()"
                (change)="toggleTheme($event)"
              />
              <label class="form-check-label" for="themeSwitch">
                <span class="icon sun">☀</span>
                <span class="icon moon">☾</span>
              </label>
            </div>
          </div>
        </header>

        <!-- GRID 2 columnas -->
        <div class="row g-4 align-items-start app-grid">
          <!-- IZQUIERDA -->
          <div class="col-12 col-lg-5">
            <section class="card glass card-body p-4 mb-4">
              <app-todo-form></app-todo-form>
            </section>

            <section class="stats-grid">
              <app-todo-stats></app-todo-stats>
            </section>
          </div>

          <!-- DERECHA -->
          <div class="col-12 col-lg-7">
            <section class="card glass card-body p-4 todo-right-panel">
              <app-todo-filter></app-todo-filter>

              <div class="todo-list-scroll">
                <app-todo-list></app-todo-list>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class App implements OnInit {
  private readonly THEME_KEY = 'theme';

  ngOnInit(): void {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'dark') document.body.classList.add('dark');
  }

  toggleTheme(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      document.body.classList.add('dark');
      localStorage.setItem(this.THEME_KEY, 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem(this.THEME_KEY, 'light');
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}