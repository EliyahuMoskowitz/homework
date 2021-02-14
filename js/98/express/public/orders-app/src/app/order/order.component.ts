import { Component, Input } from '@angular/core';
import { Order } from '../shared/Order';
// import { Person } from '../shared/Person';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @Input()
  order!: Order;
 
}
