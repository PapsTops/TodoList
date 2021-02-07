import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService {

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);

  public readonly todos: Observable<Todo[]> = this._todos.asObservable();


  addTodo(todo: Todo) {

    const addTaskObservable = new Observable<void>((_) => {

      const currentValue = this._todos.getValue();

      currentValue.push(todo);

      this._todos.next(currentValue);

    });

    return addTaskObservable;

  };

  deleteTodo(todo: Todo) {

    const deleteObservable = new Observable<void>((_) => {

      let { index, todos } = this.getTaskIndex(todo);

      if (index < 0) return;

      todos.splice(index, 1);

      this._todos.next(todos);

    });

    return deleteObservable;

  };

  getTodo(id: string) {

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


  toggleTodo(todo: Todo) {

    const toggleTaskObservable = new Observable<void>(() => {

      const { index, todos } = this.getTaskIndex(todo);

      if (index < 0) return;

      todos[index].done = !todos[index].done;

      this._todos.next(todos);
    });


    return toggleTaskObservable;
  }


  updateTodo(todo: Todo) {

    const updateTaskObservable = new Observable<void>(() => {

      const { index, todos } = this.getTaskIndex(todo);

      if (index < 0) return;

      todos[index] = todo;

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
  addTodo: (todo: Todo) => Observable<void>;
  deleteTodo: (todo: Todo) => Observable<void>;
  updateTodo: (todo: Todo) => Observable<void>;
  getTodo: (id: string) => Observable<Todo>;
  toggleTodo: (todo: Todo) => Observable<void>;
}
