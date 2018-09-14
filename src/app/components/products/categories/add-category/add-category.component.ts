import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryName: string;

  constructor(private service: DataService, public dialogRef: MatDialogRef<AddCategoryComponent>) {

  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddCategory() {
    this.service.addCategory(this.categoryName);
  }
}
