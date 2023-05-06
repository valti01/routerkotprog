import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  // CRUD (Create, Read, Update, Delete)

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges({limit: 1}).pipe(
      map((user: User | undefined) => {
        if (!user) {
          throw new Error(`User with id ${id} not found`);
        }
        return user;
      })
    );
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  updateFirstName(id: string, newName: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).update({
      'firstname': newName
    });
  }

  updateLastName(id: string, newName: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).update({
      'lastname': newName
    });
  }

  delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
}
