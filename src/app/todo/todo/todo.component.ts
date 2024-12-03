import { Component, computed, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [FormsModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  public todos:Todo[]=[]

  display = this.todoService.display

  todo = new Todo();
  constructor() {
    this.todos = this.todoService.getTodos()
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);

  }

  updateInProgress(todo: Todo) {
    this.todoService.update(todo,'in progress')
  }
  updateDone(todo: Todo) {
    this.todoService.update(todo,'done')
  }
  updateWaiting(todo: Todo) {
    this.todoService.update(todo,'waiting')
  }

}
