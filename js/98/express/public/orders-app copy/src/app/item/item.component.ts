import { Component, Input } from '@angular/core';
import { Item } from '../shared/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  static run = 0;
  numItem = ++ItemComponent.run;

  @Input()
  item!: Item
}
