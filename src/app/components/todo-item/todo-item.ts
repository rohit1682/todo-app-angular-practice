import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, UpdateTodoDto } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<{ id: number; updates: UpdateTodoDto }>();
  @Output() todoDeleted = new EventEmitter<number>();
  @Output() todoToggled = new EventEmitter<number>();

  isEditing = false;
  editTitle = '';
  editDescription = '';

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editDescription = '';
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      const updates: UpdateTodoDto = {
        title: this.editTitle.trim(),
        description: this.editDescription.trim()
      };
      this.todoUpdated.emit({ id: this.todo.id, updates });
      this.isEditing = false;
    }
  }

  onToggle(): void {
    this.todoToggled.emit(this.todo.id);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoDeleted.emit(this.todo.id);
    }
  }
}
