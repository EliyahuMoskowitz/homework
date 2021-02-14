import { Component } from '@angular/core';
import { Order } from './shared/Order';
// import { Person } from './shared/Person';
// import { Address } from './shared/Address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orders-app';

  order: Order = {
    person: {
      first: 'Eliyahu',
      last: 'Moskowitz',
      age: 18,
      address: {
        street: '1456 W 42 street',
        city: 'Saten Island',
        state: 'NY',
        zip: '18701'
      }
    },
    date: new Date(),
    items: [{name: 'Pizza', price: 5, weight: '16oz'}, {name: 'Salmon', price: 25.5, weight: '48oz'}]
  };
}
