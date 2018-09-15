import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// import firebase libs
import { AngularFireModule } from 'angularfire2';
import { AppConfig } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Angular Material Modules
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { AddClassComponent } from './components/products/classes/add-class/add-class.component';
import { AddCategoryComponent } from './components/products/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ClassesComponent } from './components/products/classes/classes.component';
import { ProductsComponent } from './components/products/products.component';
import { DataService } from './providers/data.service';
import { CategoriesTableComponent } from './components/products/categories/categories-table/categories-table.component';
import { ClassesTableComponent } from './components/products/classes/classes-table/classes-table.component';
import { ProductComponent } from './components/products/product/product.component';
import { ClassComponent } from './components/products/classes/class/class.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ProductTableComponent,
    CustomerTableComponent,
    AddProductComponent,
    AddClassComponent,
    AddCategoryComponent,
    CategoriesComponent,
    ClassesComponent,
    ProductsComponent,
    CategoriesTableComponent,
    ClassesTableComponent,
    ProductComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [ElectronService, DataService],
  bootstrap: [
    ProductComponent,
    AddProductComponent,
    AddCategoryComponent,
    AddClassComponent,
    ClassComponent,
    AppComponent,
  ]
})
export class AppModule {}
