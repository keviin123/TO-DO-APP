import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';

interface TodoFormValue {
  title: FormControl<string>;
  startDate: FormControl<string>;
}

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrls: ['./todo-form.scss'],
})
export class TodoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly todoService = inject(TodoService);

  // Form tipado (sin any)
  form: FormGroup<TodoFormValue> = this.fb.group({
    title: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    startDate: this.fb.nonNullable.control('', [Validators.required]),
  });

  openDatePicker(input: HTMLInputElement) {
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const title = this.form.controls.title.value.trim();
    const startDate = this.form.controls.startDate.value;

    this.todoService.addTodo(title, startDate);
    this.form.reset();
  }
}