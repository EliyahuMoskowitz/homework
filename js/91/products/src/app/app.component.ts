import { Component } from '@angular/core';
import { Category } from 'src/shared/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'products';
  // category: Category;

  setCategory(value /*index: number*/ /* {target: {value}} */){
    // console.log(index);
    // this.category = this.categories.find(c => c.name === value);
    // let index: number = +value[value.length - 1] -1;   //if option has no [value], and we are getting the inputed string
    this.category = this.categories.find((c,i) => i === +value /*index*/);
  }

  categories: Category[] = [
    {
      name: 'Computers',
      items: [
        {
          name: 'Windows 10',
          price: 500
        },
        {
          name: 'Linux',
          price: 400
        },
        {
          name: 'Mac',
          price: 250
        }
      ]
    },
    {
      name: 'Appliances',
      items: [
        {
          name: 'Oven',
          price: 580.8
        },
        {
          name: 'Cabinet',
          price: 412.6
        },
        {
          name: 'Washing Machine',
          price: 425.65
        }
      ]
    },
    {
      name: 'Cars',
      items: [
        {
          name: 'Honda Accord',
          price: 12450
        },
        {
          name: 'Toyota Camry',
          price: 14523.5
        },
        {
          name: 'Ford Express',
          price: 10000.5
        }
      ]
    },{name: 'Cakes', items: []}
  ];
  category: Category = this.categories[0];
  // for ngModel
  // catNumber: string;
  // category: Category = this.categories.find((c, i) => i === +this.catNumber) || this.categories[0];
  // category: Category = this.categories.find(c => c.name === this.catName) || this.categories[0];

  addCategory(value: string  /*{target: {value}}*/ ){
    this.categories.push({name: value/*.charAt(0).toUpperCase()*/ || 'Unknown', items: []});
    console.log(this.categories, value);
  }

  choosingCategory: any;
  deleteCategory(/*index: number*/ /*category: Category*/ category: string, all: boolean ){
    // /*if(this.choosingCategory) {*/this.categories = this.categories.filter(c => c.name !== category);//}
    if(this.choosingCategory) {
      if (all) {
        this.categories = [];
      } else if(category) {
        let index: number = +category[category.length - 1] -1;
    // let theCat = this.categories.find(c => c.name === category);
    // let index = this.categories.indexOf(theCat);
    this.categories.splice(index, 1);
    console.log(this.categories, category/*, theCat*/);
      }
    }

    this.choosingCategory = !this.choosingCategory;
  }

}
