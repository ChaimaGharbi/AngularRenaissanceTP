import { Injectable, computed, inject,signal } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';
import { TodoStatus } from "../model/status";


type todoDict = {
  [key:string]:Todo[]
}


let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  public todos = signal<Todo[]>([])

  public display = computed(()=>{
    let dis:todoDict={'waiting':[],'in progress':[],'done':[]}
   this.todos().map((todo)=>{
    if (todo.status==='waiting'){
      dis['waiting'].push(todo)
    }else if(todo.status==='in progress'){
      dis['in progress'].push(todo)
    }else{
      dis['done'].push(todo)
    }

   })
   
   return dis
  })

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.update((todos)=>{
      todos.push(todo)
      return [...todos]
    })
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    const index = this.todos().indexOf(todo);
    if (index > -1) {
      this.todos.update((todos)=>{
        todos.splice(index, 1);
        return [...todos]
      })
      
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

  update(todo: Todo,status: TodoStatus) {
    const index = this.todos().indexOf(todo)
    this.todos.update((todos)=>{
      todos[index].status=status;
      return [...todos]
    })
  }

}
