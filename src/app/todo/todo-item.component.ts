import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo!: Todo;

  @Output()
  todoUpdatedEvent = new EventEmitter<Todo>();

  @Output()
  todoDeletedEvent = new EventEmitter<Todo>();

  canEdit = false;
  description = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.description.setValue(this.todo.description);
  }

  onUpdate(): void {
    this.todo.description = this.description.value;
    this.todoUpdatedEvent.emit(this.todo);
    this.canEdit = false;
  }

  onEdit(): void {
    this.canEdit = true;
  }

  onDelete(): void {
    this.todoDeletedEvent.emit(this.todo);
  }

}
