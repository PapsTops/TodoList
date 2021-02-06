import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService {

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);

  public readonly tasks: Observable<Todo[]> = this._todos.asObservable();


  addTask(todo: Todo) {

    const addTaskObservable = new Observable<void>((_) => {

      const currentValue = this._todos.getValue();

      currentValue.push(todo);

      this._todos.next(currentValue);

    });

    return addTaskObservable;

  };

  deleteTask(task: Todo) {

    const deleteObservable = new Observable<void>((_) => {

      let { index, todos } = this.getTaskIndex(task);

      if (index < 0) return;

      todos = this._todos.getValue().splice(index, 1);

      this._todos.next(todos);

    });

    return deleteObservable;

  };

  getTask(id: string) {

    const getItemObservable = new Observable<Todo>((observer) => {

      const todo = this._todos.getValue().find(x => x._id === id);

      if (todo == undefined) {
        observer.error(`Can't find todo with id of "${id}"`)
      } else {
        observer.next(todo);
      }

    });

    return getItemObservable;

  };


  toggleTask(task: Todo) {

    const toggleTaskObservable = new Observable<void>(() => {

      const { index, todos } = this.getTaskIndex(task);

      if (index < 0) return;

      todos[index].done = !todos[index].done;

      this._todos.next(todos);
    });


    return toggleTaskObservable;
  }


  updateTask(task: Todo) {

    const updateTaskObservable = new Observable<void>(() => {

      const { index, todos } = this.getTaskIndex(task);

      if (index < 0) return;

      todos[index] = task;

      this._todos.next(todos);

    });

    return updateTaskObservable;

  }


  private getTaskIndex(todo: Todo) {
    const todos = this._todos.getValue();
    const index = todos.findIndex(x => todo._id === x._id);
    return { index, todos };
  }

}


export interface ITodoService {
  addTask: (todo: Todo) => Observable<void>;
  deleteTask: (todo: Todo) => Observable<void>;
  updateTask: (todo: Todo) => Observable<void>;
  getTask: (id: string) => Observable<Todo>;
  toggleTask: (todo
    : Todo) => Observable<void>;
}
