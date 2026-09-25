import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly apiUrl = 'http://localhost:3000/todos';

  readonly todos = signal<Todo[]>([]);

  constructor() {
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    const response = await fetch(this.apiUrl);
    const todos = await response.json();
    this.todos.set(todos);
  }

  async addTodo(title: string, dueDate: string): Promise<void> {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: trimmed,
        dueDate,
        completed: false
      })
    });

    const newTodo = await response.json();

    this.todos.update(items => [...items, newTodo]);
  }

  async toggleTodo(todo: Todo): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !todo.completed
      })
    });

    const updatedTodo = await response.json();

    this.todos.update(items =>
      items.map(item =>
        item._id === updatedTodo._id ? updatedTodo : item
      )
    );
  }

  async deleteTodo(todo: Todo): Promise<void> {
    await fetch(`${this.apiUrl}/${todo._id}`, {
      method: 'DELETE'
    });

    this.todos.update(items =>
      items.filter(item => item._id !== todo._id)
    );
  }
}