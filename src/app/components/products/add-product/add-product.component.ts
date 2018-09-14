import { Component, OnInit, OnDestroy } from '@angular/core';
import { Class } from '../../../models/class.model';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { DataService } from '../../../providers/data.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  // this will be the product item that is sent to the firebase.
  newProduct: Product;
  useClassProperties = true;


  categories: Category[];
  categoriesSubscription: Subscription;

  classesSubscription: Subscription;
  classes: Class[];
  availableClasses: Class[];

  unit1: string;
  unit2: string;
  unit3: string;
  unit1Qty: number;
  unit2Qty: number;
  unit3Qt: number;

  unitOptions = ['', 'box', 'case', 'each'];

  selectedClass: Class;
  selectedCategory: Category;

  newCats: any;
  constructor(private service: DataService, public dialogRef: MatDialogRef<AddProductComponent>) {
  }

  ngOnInit() {
    this.categoriesSubscription = this.service.categoriesChanged.subscribe(
      categories => (this.categories = categories)
    );
    this.service.fetchCategories();
    this.classesSubscription = this.service.classesChanged.subscribe(
      classes => (this.classes = classes)
    );
    this.service.fetchClasses();
    // initalize the new product object for databinding to the form.
    this.newProduct = {
      name: '',
      price: 0,
      onHandQty: 0,
      description: '',
      costPrice: 0,
      class: '',
      category: '',
      id: '',
      units: {
        unit1: '',
        unit1Qty: 0,
        unit1Barcode: '',
        unit2: '',
        unit2Qty: 0,
        unit2Barcode: '',
        unit3: '',
        unit3Qty: 0,
        unit3Barcode: ''
      },
      useClassProperty: true
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCategorySelected(): void {
    console.log('selected a category');
    this.generateSelectableClasses();
    console.log('classes for this category are: ', this.availableClasses);
  }

  generateSelectableClasses(): void {
    this.availableClasses = this.classes.filter(classs => classs.category === this.selectedCategory.name);
  }

  onClassSelected(): void {
    // console.log('class selected');
    // console.log('result of find is:', this.classes.find(val => val.name == this.selectedClass));
    this.newProduct.class = this.classes.find(val => val.name === this.selectedClass.name).name;
  }

  onAddNewProduct() {
    // here we ad the logic to add a new item.
    const classToSendToService = this.classes.find(val => val.name === this.selectedClass.name);
    console.log('adding a new item...');
    this.newProduct.category = this.selectedCategory.name;
    this.newProduct.class = this.selectedClass.name;
    console.log('new item class is: ', this.newProduct.class);
    this.service.addItem(this.newProduct, this.selectedClass);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
    this.classesSubscription.unsubscribe();
  }

}
