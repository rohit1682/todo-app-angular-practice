import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../../models/todo.model';
import { TodoForm } from '../todo-form/todo-form';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoForm, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit, OnDestroy {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filter: 'all' | 'pending' | 'completed' = 'all';
  private todosSubscription?: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    this.todosSubscription?.unsubscribe();
  }

  onTodoCreated(createTodoDto: CreateTodoDto): void {
    this.todoService.createTodo(createTodoDto);
  }

  onTodoUpdated(event: { id: number; updates: UpdateTodoDto }): void {
    this.todoService.updateTodo(event.id, event.updates);
  }

  onTodoDeleted(id: number): void {
    this.todoService.deleteTodo(id);
  }

  onTodoToggled(id: number): void {
    this.todoService.toggleTodoComplete(id);
  }

  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'pending':
        this.filteredTodos = this.todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(todo => todo.completed);
        break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  clearCompleted(): void {
    if (confirm('Are you sure you want to delete all completed todos?')) {
      this.todoService.clearCompletedTodos();
    }
  }

  get totalCount(): number {
    return this.todos.length;
  }

  get pendingCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
}
