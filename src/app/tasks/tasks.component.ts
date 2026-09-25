import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, TodoFormComponent, TodoItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  private readonly todoService = inject(TodoService);

  todos = this.todoService.todos;
  message = signal('');

  addTodo(data: { title: string; dueDate: string }): void {
    this.todoService.addTodo(data.title, data.dueDate);
    this.message.set('Task added — keep the momentum going.');
  }

  toggleTodo(todo: Todo): void {
    this.todoService.toggleTodo(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }
}