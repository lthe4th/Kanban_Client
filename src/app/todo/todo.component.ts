import { Todo } from './../Models/Todo';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { TodoService } from '../Services/todo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import swal from 'sweetalert2'
import { BoardService } from '../Services/board.service';
import { Board } from '../Models/Board';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() Id: number
  private _afterRaise: Todo
  @Input() boards : Board[];
  @Input() set afterRaise(value: Todo) {
    this.updateAfterMoving(value);
  }
  @Output() RaiseEvent = new EventEmitter()
  constructor(private todo: TodoService, public dialog: MatDialog) { }
  localBoards : Board[] = [];
  todos: Todo[] = []
  ngOnInit() {
    this.Todos(this.Id);
    // this.localBoards = this.boards;
    this.localBoards = this.boards.filter(each => each.id !== this.Id);
  }

  compare(a:Todo,b:Todo){
    if(a.prio<b.prio){
      return 1
    }
    if(a.prio>b.prio){
      return -1
    }
  }

  updateAfterMoving(todo: Todo) {
    if (this.Id === todo.boardId) {
      this.todos.push(todo);
    }
  }

  UpdatePosition(id: number, board: Board) {
    var movingTodo = new Todo();
    this.todos.forEach(item => {
      if (item.id === id) {
        movingTodo = item;
      }
    });
    movingTodo.boardId = board.id
    this.todo.ModTodo(movingTodo).subscribe(newMoving => {
      this.todos = this.todos.filter(each => each.id !== id);
      this.RaiseEvent.emit(newMoving);
    });
  }


  Todos(Id: number) {
    this.todo.Todos(Id).subscribe(data => {
      data.sort(this.compare);
      this.todos = data
    });
  }

  RaiseUpdate() {
    var result = false
    this.RaiseEvent.emit(result);
  }

  OpenDetail(toSend: Todo) {
    const dialogRef = this.dialog.open(TodoDetailComponent, {
      data: toSend,
      autoFocus: false,
      
    })
    dialogRef.afterClosed().subscribe(data => {
      if (typeof (data) === "number") {
        this.todos = this.todos.filter(each => each.id !== data)
      }
      else if (typeof (data) === "object") {
        this.todos.filter(each => {
          if (each.id = data.id) {
            each.todoName = data.todoName
          }
        })
      }
    })
  }

  ReceivedNewTodo($event: Todo) {
    this.todos.push($event)
  }

  deleteTodo(Id: number) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      heightAuto: false
    }).then((result) => {
      if (result.value)
        this.todo.deleteTodo(Id).subscribe(result => {
          this.todos = this.todos.filter(each => each.id !== Id)
          if (result) {
            swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
              heightAuto: false
            })
          }
        })

    })
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // console.log(event.previousContainer.data)
      this.moveFilter();
    }
  }

  moveFilter() {
    var movedTodo: Todo;
    this.todos.filter(each => {
      if (each.boardId !== this.Id) {
        movedTodo = each;
      }
    })
    movedTodo.boardId = this.Id;
    this.todo.ModTodo(movedTodo).subscribe();
  }

  getTodoColor(prio: number) {
    var color: string;
    if (prio === 1) {
      color = "primary"
    }
    if (prio === 2) {
      color = "warn"
    }
    return color;
  }

  changeColor(prio: number, id: number) {
    var Tochange: Todo;
    this.todos.filter(each => {
      if (each.id === id) {
        Tochange = each;
        each.prio = prio;
      }
    })
    this.todo.ModTodo(Tochange).subscribe();
  }
}
