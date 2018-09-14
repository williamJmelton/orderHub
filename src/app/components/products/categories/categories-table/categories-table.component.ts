import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import { Subscription } from 'rxjs';
import { AddCategoryComponent } from '../../categories/add-category/add-category.component';
import { Category } from '../../../../models/category.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit, OnDestroy {
  categories: Category[];
  categoriesSubscription: Subscription;

  displayedColumns: string[] = ['name'];
  selectedRowIndex = -1;

  constructor(private service: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.categoriesSubscription = this.service.categoriesChanged.subscribe(categories => {
      this.categories = categories;
      console.log('categories are: ', categories);
    });
    this.service.fetchCategories();
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = row.id;
    }
  }

  onOpenAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '60%',
      height: '40%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog did it\'s job.');
    });
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }
}
