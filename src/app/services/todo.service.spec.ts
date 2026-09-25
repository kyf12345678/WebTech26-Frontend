import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should keep task data shared across components', () => {
    service.clear();
    service.addTodo('Test task', '09/08/2026');

    expect(service.todos().length).toBe(1);
    expect(service.todos()[0].title).toBe('Test task');

    service.toggleTodo(service.todos()[0]);
    expect(service.todos()[0].completed).toBeTrue();
  });
});
