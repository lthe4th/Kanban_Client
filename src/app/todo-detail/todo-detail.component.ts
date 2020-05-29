import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Todo } from '../Models/Todo';
import { ItemService } from '../Services/item.service';
import { Item } from '../Models/Item';
import { TodoService } from '../Services/todo.service';
import { CC } from '../Models/ConfirmFormCase';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import swal from 'sweetalert2'

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  CC = new CC()
  constructor(
    public diaglogRef: MatDialogRef<TodoDetailComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private todo: TodoService
  ) { }

  ngOnInit() {

  }



  deleteThisTask() {
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
      if (result.value) {
        this.todo.deleteTodo(this.data.id).subscribe(result => {
          this.diaglogRef.close(this.data.id)
          if (result) {
            swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
              heightAuto: false
            })
          }
        })
      }

    })
  }

  changeName() {
    // swal.fire({
    //   text:"New Name ?",
    //   input: 'text',
    //   confirmButtonText: 'save',
    //   showCancelButton: true,
    // }).then((result) => {
    //   if(result.value === ""){
    //     swal.fire({
    //       text:"that can't be empty dude",
    //       icon :"error",
    //       confirmButtonText:"Ok"
    //     })
    //   }
  
    // })
    swal.fire({
      title: 'Enter New name',
      input: 'text',
      inputValue: name,
      showCancelButton: true,
      heightAuto: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        value = value.trim();
        var modNameTodo = new Todo();
        modNameTodo = this.data;
        modNameTodo.todoName = value;
        this.todo.ModTodo(modNameTodo).subscribe(data => this.data = data);
        
      }
    })
  }

}
