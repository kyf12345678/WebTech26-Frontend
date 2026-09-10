import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, TodoFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  message = signal('');

  addTodo(data: { title: string; dueDate: string }): void {
    console.log(data);
    this.message.set('Task added.');
  }
}