import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../../models/category.model';
import { Class } from '../../../../models/class.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit, OnDestroy {
  className: string;
  selectedCategory: Category;
  categories: Category[];
  categoriesSubscription: Subscription;
  classPrice: number;
  classCost: number;
  newClass: Class;
  unitOptions = ['', 'box', 'case', 'each'];

  constructor(private service: DataService, public dialogRef: MatDialogRef<AddClassComponent>) {

   }

  ngOnInit() {
    this.categoriesSubscription = this.service.categoriesChanged.subscribe(
      categories => (this.categories = categories)
    );
    this.service.fetchCategories();
    this.newClass = {
      name: '',
      category: '',
      price: 0,
      id: '',
      cost: 0,
      units: {
        unit1: '',
        unit1Qty: 0,
        unit2: '',
        unit2Qty: 0,
        unit3: '',
        unit3Qty: 0
      }
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

  onAddClass() {
    this.service.addClass(this.newClass, this.selectedCategory.id);
  }

}
