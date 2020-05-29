import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../Services/item.service';
import { Item } from '../Models/Item';
import swal from 'sweetalert2'
@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  @Input() todoId: number
  constructor(private item: ItemService) { }
  checkList: Item[] = [];
  percentOfFinished: number;
  // numberofitem = 0;
  // numberOfItemFinished = 0;
  ngOnInit() {
    this.Items(this.todoId);
  }

  Items(Id: number) {
    this.item.GetItems(Id).subscribe(data => {
      this.checkList = data;
      this.CalculatePercent();
    });
  }

  CalculatePercent() {
    var count = 0;
    this.checkList.forEach(element => {
      if (element.isfinished) {
        count = count + 1;
      }
    });
    this.percentOfFinished = Math.ceil(count / this.checkList.length * 100)

    // this.percentOfFinished = this.numberOfItemFinished/this.numberofitem*100
  }


  NewItem(Id: number, name: string) {
    if (name === "") {
      swal.fire(
        { title: "THAT cant\' be empty", text: "type again ?", icon: "warning", heightAuto: false }
      );
      return;
    }
    const newItem = new Item();
    newItem.todoid = Id;
    newItem.itemName = name;
    this.item.NewItem(newItem).subscribe(newItem => {
      this.checkList.push(newItem);
      this.CalculatePercent();
    });
  }



  UpdateStatus(item: Item) {

    var item2 = new Item();
    item2 = item;
    item2.isfinished = !item.isfinished
    // console.log(`${JSON.stringify(item2)}`)
    this.item.ModItem(item2).subscribe(result => {
      if (result) {
        this.Items(this.todoId);
      }
    })
  }
}
