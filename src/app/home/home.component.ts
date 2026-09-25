import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressComponent } from '../progress/progress.component';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProgressComponent, TodoItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly todoService = inject(TodoService);

  filter = signal<Filter>('all');
  showTasks = signal(false);
  todos = this.todoService.todos;

  get completedCount(): number {
    return this.todos().filter(todo => todo.completed).length;
  }

  get activeCount(): number {
    return this.todos().filter(todo => !todo.completed).length;
  }

  get visibleTodos(): Todo[] {
    if (this.filter() === 'active') {
      return this.todos().filter(todo => !todo.completed);
    }

    if (this.filter() === 'completed') {
      return this.todos().filter(todo => todo.completed);
    }

    return this.todos();
  }

  setFilter(filter: Filter): void {
    this.filter.set(filter);
    this.showTasks.set(true);
  }

  toggleTodo(todo: Todo): void {
    this.todoService.toggleTodo(todo);
  }
}