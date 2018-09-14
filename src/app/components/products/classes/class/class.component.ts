import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { Class } from '../../../../models/class.model';
import { DataService } from '../../../../providers/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../../../../models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  @Input()
  classData: Class;

  // Get category data from service
  categories: Category[];
  categoriesSubscription: Subscription;
  selectedCategory: Category;
  oldCategory: Category;

  unitOptions = ['', 'box', 'case', 'each'];

  constructor(
    private service: DataService,
    public dialogRef: MatDialogRef<ClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Class
  ) {}

  ngOnInit() {
    this.classData = this.data; // assign classData data from classData table to local var
    console.log('classData for class component: ', this.classData);
    this.categoriesSubscription = this.service.categoriesChanged.subscribe( // get the categories list
      categories => {
        this.categories = categories; // assign local var the list of categories
        // set the
        // inital value of the category to the items value
        this.selectedCategory = this.categories.find(category => this.classData.category === category.name);
        // this.onCategorySelected(); // call this function to generate the classes selectable
                                   // for the selected category.
      }
    );
    this.service.fetchCategories(); // get the list of categories
    console.log('from the class coponent, classData is: ', this.classData);
    this.oldCategory = this.selectedCategory;
  }

  onUpdateClass() {
    this.service.updateClass(this.classData, this.selectedCategory, this.oldCategory);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
