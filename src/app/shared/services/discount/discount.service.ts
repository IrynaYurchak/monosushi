import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {IDiscountRequest, IDiscountResponse} from '../../interfaces/discount/discount.interface';
import {addDoc, collection, CollectionReference, DocumentData, Firestore, getFirestore} from 'firebase/firestore';
import {collectionData, deleteDoc, doc, docData, updateDoc} from '@angular/fire/firestore';
import {initializeApp} from 'firebase/app';
import {secondaryFirebaseConfig} from '../../../components/auth-dialog/auth-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discountCollection!: CollectionReference<DocumentData>;
  private secondaryApp = initializeApp(secondaryFirebaseConfig, 'secondary');
  private secondaryFirestore: Firestore;
  constructor() {
    this.secondaryFirestore = getFirestore(this.secondaryApp);
    this.discountCollection = collection(this.secondaryFirestore, 'discounts');
  }

  createFirebase(discount:IDiscountRequest) {
    return from(
      addDoc(this.discountCollection, discount).then(docRef => ({
        id: docRef.id,
        ...discount,
      }))
    );
  }

  getAllFirebase(): Observable<IDiscountResponse[]> {
    return collectionData(this.discountCollection, { idField: 'id' }) as Observable<IDiscountResponse[]>;
  }

  getOneFirebase(id: string): Observable<IDiscountResponse> {
    const discountDocumentReference = doc(this.secondaryFirestore, `discounts/${id}`);
    return docData(discountDocumentReference, { idField: 'id' }) as Observable<IDiscountResponse>;
  }


  updateFirebase(discount: IDiscountRequest, id: string): Promise<void> {
    const discountDocumentReference = doc(this.secondaryFirestore, `discounts/${id}`);
    return updateDoc(discountDocumentReference, { ...discount });
  }

  deleteFirebase(id: string){
    const discountDocumentReferense=doc(this.secondaryFirestore, `discounts/${id}`);
    return deleteDoc(discountDocumentReferense)
  }
}
