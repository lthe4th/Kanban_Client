import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CC } from '../Models/ConfirmFormCase';
import { Board } from '../Models/Board';
import { BoardService } from '../Services/board.service';
import { Todo } from '../Models/Todo';
import swal from 'sweetalert2'



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private board: BoardService
  ) { }

  ngOnInit() {
  }

  modedBoard: Board;


  ModName(name: string) {
    if (name === "") {
      swal.fire({
        title: "THAT cant\' be empty", icon: "warning", heightAuto: false
      });
      return;
    }
    var newboard = new Board();
    newboard.boardName = name;
    newboard.id = this.data.id;
    this.board.ModBoard(newboard).subscribe(modedBoard => {
      this.dialogRef.close(modedBoard);
    });

  }

}
