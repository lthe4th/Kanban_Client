import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../Services/todo.service';
import { Todo } from '../Models/Todo';
import swal from 'sweetalert2'
@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  @Input() BoardId: number;
  @Output() NewTodoEvent = new EventEmitter<Todo>();

  constructor(private todo: TodoService) { }

  ngOnInit() {
  }

  newTodo(name: string, boardId: number) {
    if (name === "") {
      swal.fire(
        { title: "THAT cant\' be empty", text: "type again ?", icon: "warning", heightAuto: false }
      );
      return;
    }
    const newTodo = new Todo();
    newTodo.boardId = boardId;
    newTodo.todoName = name;
    this.todo.NewTodo(newTodo).subscribe(data => this.NewTodoEvent.emit(data));
  }

}
