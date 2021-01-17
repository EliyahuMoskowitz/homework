import { Component, Input } from '@angular/core';
import { Category } from 'src/shared/category';
import { Item } from 'src/shared/item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  {

@Input()
  category: Category


  addItem(value /*{target: {value}}*/){
    // this.category.items = this.category.items || [];
    let newItem = value.split(':');
    this.category.items?.push({name: newItem[0] || 'Unknown', price: newItem[1] || 0});
  }

  deleteItem(item: Item){
    this.category.items = this.category.items.filter(i => i !== item);
  }

}
