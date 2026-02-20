import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateTodoDto } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  @Output() todoCreated = new EventEmitter<CreateTodoDto>();

  title = '';
  description = '';

  onSubmit(): void {
    if (this.title.trim()) {
      const newTodo: CreateTodoDto = {
        title: this.title.trim(),
        description: this.description.trim()
      };

      this.todoCreated.emit(newTodo);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
  }
}
