import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  CollectionReference
} from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Class } from '../models/class.model';
import { Customer } from '../models/customer.model';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

export interface AddProductOptions {
  useClassProperties: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private classesCollection: AngularFirestoreCollection<Class>;
  private categoriesCollection: AngularFirestoreCollection<Category>;

  private categories: Category[];
  categoriesChanged = new Subject<Category[]>();

  private classes: Class[];
  classesChanged = new Subject<Class[]>();

  private products: Product[];
  productsChanged = new Subject<Product[]>();

  private categoryDoc: AngularFirestoreDocument<Category>;
  category: Observable<Category>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = db.collection<Product>('products');
    this.classesCollection = db.collection<Class>('classes');
    this.categoriesCollection = db.collection<Category>('categories');
  }

  fetchProducts() {
    this.db
      .collection('products')
      .valueChanges()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(products);
        this.productsChanged.next([...this.products]);
      });
  }
  fetchClasses() {
    this.db
      .collection('classes')
      .valueChanges()
      .subscribe((classes: Class[]) => {
        this.classes = classes;
        this.classesChanged.next([...this.classes]);
      });
  }
  fetchCategories() {
    this.db
      .collection('categories')
      .valueChanges()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesChanged.next([...this.categories]);
      });
  }

  addItem(product: Product, classObj: Class) {
    const id = this.db.createId();
    product.id = id;
    if (product.useClassProperty) {
      product.costPrice = classObj.cost;
      product.price = classObj.price;
    }
    this.productsCollection.doc(id).set(product);
  }
  deleteItem(itemId: string) {
    this.productsCollection.doc(itemId).delete();
  }

  updateItem(product: Product) {
    this.productsCollection.doc(product.id).update(product);
  }

  addCategory(name: string) {
    let id;
    id = this.db.createId();
    this.categoriesCollection.doc(id).set({
      name: name,
      classes: [],
      id: id
    });
  }

  addClass(val: Class, categoryId: string) {
    let tempCategoryData;
    // we need to get refrence to the category of the class so we can add the class to its
    // classes array.
    this.categoryDoc = this.db.doc('/categories/' + categoryId);
    this.categoryDoc
      .valueChanges()
      .pipe(take(1))
      .subscribe(data => {
        tempCategoryData = data; // put the class category data in temp var
        const id = this.db.createId(); // make a new id for the new class
        val.id = id; // set the id of the class using the newly generated id
        val.category = tempCategoryData.name; // set the category name using the fresh category data
        tempCategoryData.classes.push(val.name); // push the new class name into the category it belongs too
        this.categoryDoc.update(tempCategoryData); // update the category document
        this.classesCollection.doc(id).set(val); // add the class document to the collection.
      });
  }

  updateClass(classData: Class, newCategory: Category, oldCategory: Category) {
    /**
     * this is where we are gonna reach out to the cateogry and make the neccesary changes to it.
     */
    this.categoryDoc = this.db.doc('/categories/' + newCategory);
    this.categoryDoc
      .valueChanges()
      .pipe(take(1))
      .subscribe((category: Category) => {
        if (newCategory === category) {
          // then the category hasn't changed on the class. We
          // just need to update the classlist on this same cateory.
          this.new
        }
      });
  }
}
