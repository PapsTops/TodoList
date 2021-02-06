import { Injectable } from '@angular/core';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements ITodoListService {

  private _tasks: Task[] = [];

  addItem(task: Task) {
    this._tasks.push(task);
  };

  deleteItem(task: Task) {
    const index = this._tasks.findIndex(x => x.id === task.id)

    if (index < 0) return;

    this._tasks.splice(index, 1);
  };

  getItem(id: number) {
    const task = this._tasks.find(x => x.id === id);
    return task;
  };

  getItems() {
    return this._tasks;
  };
}


export interface ITodoListService {
  addItem: (task: Task) => void;
  deleteItem: (task: Task) => void;
  getItem: (id: number) => Task | undefined;
  getItems: () => Task[]
}