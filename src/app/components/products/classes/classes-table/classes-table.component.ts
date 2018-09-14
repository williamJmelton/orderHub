import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import { AddClassComponent } from '../../classes/add-class/add-class.component';
import { ClassComponent } from '../../classes/class/class.component';
import { Subscription } from 'rxjs';
import { Class } from '../../../../models/class.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent implements OnInit, OnDestroy {
  classes: Class[];
  classesSubscription: Subscription;

  displayedColumns: string[] = ['name', 'category', 'price', 'costPrice'];
  selectedRowIndex = -1;

  constructor(private service: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.classesSubscription = this.service.classesChanged.subscribe(classes => {
      this.classes = classes;
      console.log(classes);
    });
    this.service.fetchClasses();
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = row.id;
    }
  }

  onOpenClassDialog(rowData: Class): void {
    const dialogRef = this.dialog.open(ClassComponent, {
      panelClass: 'bookCardDialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: rowData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog did it\'s job.');
    });
  }

  onOpenAddClassDialog(): void {
    const dialogRef = this.dialog.open(AddClassComponent, {
      panelClass: 'bookCardDialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // toast notification goes here.
      console.log('the dialog did it\'s job.');
    });
  }

  ngOnDestroy() {
    this.classesSubscription.unsubscribe();
  }
}
