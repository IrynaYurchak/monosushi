import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc, CollectionReference, DocumentData } from 'firebase/firestore';
import {from, map, Observable} from 'rxjs';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category/category.interface';
import { secondaryFirebaseConfig } from '../../../components/auth-dialog/auth-dialog.component';
import {collectionData, deleteDoc, doc, docData, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryFirestore: Firestore;
  private categoryCollection!: CollectionReference<DocumentData>;

  constructor() {
    this.secondaryFirestore = getFirestore(this.secondaryApp);
    this.categoryCollection = collection(this.secondaryFirestore, 'categories');
  }

  createFirebase(category: ICategoryRequest) {
    return from(
      addDoc(this.categoryCollection, category).then(docRef => ({
        id: docRef.id,
        ...category,
      }))
    );
  }

  // getAllFirebase(){
  //   return collectionData(this.categoryCollection,{idField: 'id'})
  // }
  getAllFirebase(): Observable<ICategoryResponse[]> {
    return collectionData(this.categoryCollection, { idField: 'id' }).pipe(
      map((categories) =>
        categories.map((category) => category as ICategoryResponse)
      )
    );
  }
  getOneFirebase(id:string){
    const categoryDocumentReferense=doc(this.secondaryFirestore, `categories/${id}`);
return docData(categoryDocumentReferense, {idField: 'id'} )
  }

  updateFirebase(category: ICategoryRequest, id: string){
  const categoryDocumentReferense=doc(this.secondaryFirestore, `categories/${id}`);
  return updateDoc(categoryDocumentReferense, {...category}) }

  deleteFirebase(id: string){
    const categoryDocumentReferense=doc(this.secondaryFirestore, `categories/${id}`);
    return deleteDoc(categoryDocumentReferense)
  }
}

