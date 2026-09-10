import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  completed = input.required<number>();
  total = input.required<number>();
  percentage = 0;

  get progressPercentage(): number {
    return this.total() === 0 ? 0 : Math.round((this.completed() / this.total()) * 100);
  }
}
