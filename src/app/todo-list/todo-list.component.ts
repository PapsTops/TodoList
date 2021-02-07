import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public todoService: TodoService) { }


  todoForm = this.fb.group({
    description: ['', Validators.required]
  })

  ngOnInit(): void {
    this.todoService.todos.subscribe(tasks => {
      console.log(tasks)
    })
  }


  onUpdate(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  toggleTask(task: Todo) {
    this.todoService.toggleTodo(task).subscribe();
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe();
  }

  onSubmit() {
    const description: string = this.todoForm.get("description")?.value;
    this.todoService.addTodo(new Todo(description)).subscribe();
    this.todoForm.reset()
  }

}
