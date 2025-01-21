import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ILogin } from '../../interfaces/account/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();

  constructor(private firestore: Firestore) {}

  async login(credential: ILogin): Promise<boolean> {
    try {
      const authCollection = collection(this.firestore, 'users');
      const q = query(
        authCollection,
        where('email', '==', credential.email),
        where('password', '==', credential.password) // Якщо паролі зберігаються в зашифрованому вигляді, потрібно це врахувати
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Якщо користувач знайдений, повертаємо true
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
}
