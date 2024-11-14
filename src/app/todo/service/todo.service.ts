import { Injectable, inject } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';
import { TodoStatus } from "../model/status";


let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  private todos: Todo[] = [];

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos;
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    const index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }

  updateInProgress(todo: Todo) {
    todo.status.update((value: TodoStatus) => {
      return 'in progress';
    });
  }
  updateDone(todo: Todo) {
    todo.status.update((value: TodoStatus) => {
      return 'done';
    });
  }
  updateWaiting(todo: Todo) {
    todo.status.update((value: TodoStatus) => {
      return 'waiting';
    });
  }

}
