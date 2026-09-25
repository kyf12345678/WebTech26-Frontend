import { Component, input, output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  showDelete = input<boolean>(false);
  toggleTodo = output<Todo>();
  deleteTodo = output<Todo>();

  toggle(): void {
    this.toggleTodo.emit(this.todo());
  }

  delete(): void {
    this.deleteTodo.emit(this.todo());
  }
}