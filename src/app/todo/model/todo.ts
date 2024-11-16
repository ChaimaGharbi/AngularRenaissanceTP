import { signal, WritableSignal } from "@angular/core";
import { TodoStatus } from "./status";

export class Todo {
  private id: number = 0;
  public status: TodoStatus ="waiting";
  constructor(public name = '', public content = '') {
  }
}
