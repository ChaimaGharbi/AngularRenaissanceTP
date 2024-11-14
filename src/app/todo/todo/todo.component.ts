import { Component, inject } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [NgFor, FormsModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  todos: Todo[] = [];
  todo = new Todo();
  constructor() {
    this.todos = this.todoService.getTodos();
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  updateInProgress(todo: Todo) {
    this.todoService.updateInProgress(todo);
  }
  updateDone(todo: Todo) {
    this.todoService.updateDone(todo);
  }
  updateWaiting(todo: Todo) {
    this.todoService.updateWaiting(todo);
  }

}
