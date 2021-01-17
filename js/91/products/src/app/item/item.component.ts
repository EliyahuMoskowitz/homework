import { /*ApplicationRef, OnInit,*/ Component, Input, Output } from '@angular/core';
// import * as EventEmitter from 'events';
import { EventEmitter } from '@angular/core';
import { Item } from 'src/shared/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent { //} implements OnInit {
  // constructor(public appRef: ApplicationRef) {}

  // onClose:EventEmitter;

 @Input()
  item: Item
  // @Input()
  // changeItems: any
  // @Input()
  // items: Item[]
  @Output()
  onClose = new EventEmitter();

  // deleteItem(){
  //   this.onClose.emit('all closed');
  // }

  // deleteItem(item: Item){
  //   console.log(this.items, item);
  //   this.items = this.items.filter(i => i !== item);
  //   // this.appRef.tick();
  //   console.log(this.items);

  //   this.onClose.emit('all closed');
  // }

  //   ngOnInit() {
  //     // this.changeItems();
  // }

}
