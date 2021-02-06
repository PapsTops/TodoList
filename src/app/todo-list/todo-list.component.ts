import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/task';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  private _currentItemToUpdate: Todo | undefined;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.tasks.subscribe(tasks => {
      console.log(tasks)
    })
  }

  onAdd() {
    this.todoService.addTask(new Todo("test")).subscribe()
  }

  onUpdate() {
    if (this._currentItemToUpdate == undefined) return;

    this.todoService.updateTask(this._currentItemToUpdate).subscribe();
    this._currentItemToUpdate = undefined;
  }

  toggleTask(task: Todo) {
    this.todoService.toggleTask(task).subscribe();
  }
}
