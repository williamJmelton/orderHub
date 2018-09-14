import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../../providers/data.service';
import { Category } from '../../../models/category.model';
import { Class } from '../../../models/class.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @Input() product: Product; // here we get the product data passed from the data table. NOT OBSERBABLE

  // Get category data from service
  categories: Category[];
  categoriesSubscription: Subscription;

  // Get class data from service
  classesSubscription: Subscription;
  classes: Class[];

  // keep hold of local variable for selected class and categories
  selectedClass: Class;
  selectedCategory: Category;

  // array of class name strings fetched from categories list of classNames
  selectableClasses: Class[];

  // list of options for item unit fields
  unitOptions = ['', 'box', 'case', 'each'];

  constructor(
    private service: DataService, // to get data from the firebase service
    public dialogRef: MatDialogRef<ProductComponent>, // allows me to open a dialog
    @Inject(MAT_DIALOG_DATA) public data: Product // injects data obj passed from product table
  ) { }

  ngOnInit() {
    this.product = this.data; // assign product data from product table to local var
    this.categoriesSubscription = this.service.categoriesChanged.subscribe( // get the categories list
      categories => {
        this.categories = categories; // assign local var the list of categories
        // set the
        // inital value of the category to the items value
        this.selectedCategory = this.categories.find(category => this.product.category === category.name);
        // this.onCategorySelected(); // call this function to generate the classes selectable
                                   // for the selected category.
      }
    );
    this.service.fetchCategories(); // get the list of classes
    this.classesSubscription = this.service.classesChanged.subscribe(
      classes => {
        this.classes = classes; // assign the classes data to the local property
        // set the selectedClass property to the property matching the sent products className.
        this.selectedClass = classes.find(val => this.product.class === val.name);
        this.onCategorySelected();
        this.onClassSelected();
      }
    );
    this.service.fetchClasses();
    // initally get the value for the avialable classes since we start the component with the cateogry selected.
  }

  ngAfterViewInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onUpdateProduct() {
    // console.log('the product data to be updated is: ', this.product);
    this.service.updateItem(this.product);
    this.dialogRef.close();
  }


  onCategorySelected(): void {
    // sets the classes available to be selected by using the selectedCategory's classList
    // this.availableClasses = this.selectedCategory.classes;
    console.log('classes before filter: ', this.classes);
    this.selectableClasses = this.classes.filter(val => (val.category === this.selectedCategory.name));
    console.log('classes AFTER filter: ', this.classes);
  }

  onClassSelected(): void {
    this.product.class = this.classes.find(val => val.name === this.selectedClass.name).name;
    this.selectedClass = this.classes.find(val => val.name === this.selectedClass.name);
  }

}
