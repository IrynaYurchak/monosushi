// import { Injectable } from '@angular/core';
// import { environment } from '../../../environment/environment';
// import { HttpClient } from '@angular/common/http';
// import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
// import { Observable } from 'rxjs/internal/Observable';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private url = environment.BACKEND_URL;
//   private api = { products: `${this.url}/products` }
//   constructor(private http: HttpClient) { }
//   getAll(): Observable<IProductResponse[]> {
//     return this.http.get<IProductResponse[]>(this.api.products);
//   }
//   getAllByCategory(name: string): Observable<IProductResponse[]> {
//     return this.http.get<IProductResponse[]>(`${this.api.products}?category=${name}`);
//   }
//   getOne(id: string): Observable<IProductResponse> {
//     return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
//   }
//   create(product: IProductRequest): Observable<IProductResponse> {
//     return this.http.post<IProductResponse>(this.api.products, product)
//   }
//   update(product: IProductRequest, id: string): Observable<IProductResponse> {
//     return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
//   }
//   delete(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.api.products}/${id}`);
//   }
//
// }

import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { secondaryFirebaseConfig } from '../../../components/auth-dialog/auth-dialog.component';
import {collectionData, deleteDoc, doc, docData, query, updateDoc, where} from "@angular/fire/firestore";
import {initializeApp} from "firebase/app";
import {addDoc, collection, CollectionReference, DocumentData, Firestore, getFirestore} from "firebase/firestore";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryFirestore: Firestore;
  private productCollection!: CollectionReference<DocumentData>;
  constructor() {
    this.secondaryFirestore = getFirestore(this.secondaryApp);
    this.productCollection = collection(this.secondaryFirestore, 'products');
  }

  createFirebase(product: IProductRequest): Observable<IProductResponse> {
    return from(
      addDoc(this.productCollection, product).then((docRef) => ({
        id: docRef.id,
        ...product,
      }) as IProductResponse)
    );
  }

  // getAllFirebase(){
  //   return collectionData(this.productCollection,{idField: 'id'})
  // }
  getAllFirebase(): Observable<IProductResponse[]> {
    return collectionData(this.productCollection, { idField: 'id' }) as Observable<IProductResponse[]>;
  }

  getAllByCategoryFirebase(categoryName: string){
    const categoryQuery = query(
      this.productCollection,
      where('category', '==', categoryName)
    );
    return collectionData(categoryQuery, { idField: 'id' });
  }
  getOneFirebase(id:string){
    const productDocumentReference = doc(this.secondaryFirestore, `products/${id}`);
    return docData(productDocumentReference, {idField: 'id'} )
  }

  // updateFirebase(category: IProductRequest, id: string){
  //   const productDocumentReference=doc(this.secondaryFirestore, `products/${id}`);
  //   return updateDoc(productDocumentReference, {...category}) }

  updateFirebase(product: IProductRequest, id: string): Promise<void> {
    const productDocRef = doc(this.secondaryFirestore, `products/${id}`);
    return updateDoc(productDocRef, { ...product });
  }

  deleteFirebase(id: string): Promise<void> {
    const productDocRef = doc(this.secondaryFirestore, `products/${id}`);
    return deleteDoc(productDocRef);
  }

}


