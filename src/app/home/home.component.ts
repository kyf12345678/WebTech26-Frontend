import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressComponent } from '../progress/progress.component';

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProgressComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filter = signal<Filter>('all');
  showTasks = signal(false);

  completedCount = 0;
  activeCount = 0;
  totalCount = 0;

  setFilter(filter: Filter): void {
    this.filter.set(filter);
    this.showTasks.set(true);
  }
}