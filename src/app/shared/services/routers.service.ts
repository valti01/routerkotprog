import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from "../models/User";
import {Router} from "../models/Router";


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
}
