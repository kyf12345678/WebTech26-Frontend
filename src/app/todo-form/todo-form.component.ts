import { Component, output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  imports: [],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  addTodo = output<{ title: string; dueDate: string }>();

  submit(title: HTMLInputElement, dueDate: HTMLInputElement): void {
    if (title.value.trim()) {
      this.addTodo.emit({ title: title.value.trim(), dueDate: dueDate.value ? this.formatDate(dueDate.value) : '' });
      title.value = '';
      dueDate.value = '';
    }
  }

  private formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  }
}
