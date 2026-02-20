import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private nextId = 1;
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Load todos from localStorage on initialization (only in browser)
    if (this.isBrowser) {
      this.loadFromLocalStorage();
    }
  }

  // Get all todos as observable
  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  // Get a single todo by id
  getTodoById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  // Create a new todo
  createTodo(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.push(newTodo);
    this.updateTodos();
    return newTodo;
  }

  // Update an existing todo
  updateTodo(id: number, updateTodoDto: UpdateTodoDto): Todo | null {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return null;
    }

    const updatedTodo: Todo = {
      ...this.todos[todoIndex],
      ...updateTodoDto,
      updatedAt: new Date()
    };

    this.todos[todoIndex] = updatedTodo;
    this.updateTodos();
    return updatedTodo;
  }

  // Delete a todo
  deleteTodo(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    
    if (this.todos.length < initialLength) {
      this.updateTodos();
      return true;
    }
    
    return false;
  }

  // Toggle todo completion status
  toggleTodoComplete(id: number): Todo | null {
    const todo = this.todos.find(t => t.id === id);
    
    if (!todo) {
      return null;
    }

    return this.updateTodo(id, { completed: !todo.completed });
  }

  // Get completed todos
  getCompletedTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed);
  }

  // Get pending todos
  getPendingTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }

  // Clear all completed todos
  clearCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.updateTodos();
  }

  // Private helper methods
  private updateTodos(): void {
    this.todosSubject.next([...this.todos]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
      localStorage.setItem('nextId', this.nextId.toString());
    }
  }

  private loadFromLocalStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    const todosJson = localStorage.getItem('todos');
    const nextIdJson = localStorage.getItem('nextId');

    if (todosJson) {
      this.todos = JSON.parse(todosJson).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }));
      this.todosSubject.next([...this.todos]);
    }

    if (nextIdJson) {
      this.nextId = parseInt(nextIdJson, 10);
    }
  }
}
