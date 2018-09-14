import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductComponent } from '../product/product.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, OnDestroy, AfterViewInit {
  products: Product[];
  productsSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  productsDataSource: MatTableDataSource<Product>;

  // vars for selecting an item
  selectedRowIndex = -1;

  displayedColumns: string[] = [
    'name',
    'category',
    'class',
    'onHandQty',
    'price',
    'costPrice',
    'delete'
  ];

  constructor(private service: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.productsSubscription = this.service.productsChanged.subscribe(products => {
      console.log('products');
      this.products = products;
      console.log('products are: ', products);
      this.productsDataSource = new MatTableDataSource<Product>(this.products);
      this.productsDataSource.sort = this.sort;
    });
    this.service.fetchProducts();
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = row.id;
    }
  }

  openNewItemDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      panelClass: 'bookCardDialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('the dialog did it\'s job.');
    });
  }

  openProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductComponent, {
      panelClass: 'bookCardDialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: product
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('the dialog did it\'s job.');
    });
  }

  deleteItem(itemId: string) {
    console.log('deleting: ', itemId);
    this.service.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // this.productsDataSource.sort = this.sort;
  }
}
