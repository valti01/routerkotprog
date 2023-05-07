import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/compat/firestore';
import {User} from "../models/User";
import {Router} from "../models/Router";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RoutersService {

  collectionName = 'Routers';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
  ) {
  }



  create(router: Router) {
    return this.afs.collection<Router>(this.collectionName).doc(router.id).set(router);
  }
  delete(routerID : string){
    this.afs.createId();
    return this.afs.collection(this.collectionName).doc(routerID).delete();
  }
  loadRouters(userID: string): Observable<Router[]> {
    return this.afs
      .collection<Router>(this.collectionName, ref => ref.where('ownerId', '==', userID))
      .valueChanges({ idField: 'id' });
  }

  checkIfIPExists(userID: string, newip: string): Observable<boolean> {
    return this.afs
      .collection<Router>(this.collectionName, ref => ref.where('ownerId', '==', userID).where('ip', '==', newip).limit(1))
      .get()
      .pipe(
        map((querySnapshot: QuerySnapshot<Router>) => {
          return querySnapshot.size === 0;
        })
      );
  }
}
