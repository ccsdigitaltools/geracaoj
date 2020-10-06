import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromoInter } from '../models/promo.interface';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private promosCollection: AngularFirestoreCollection<PromoInter>;
  private promos: Observable<PromoInter[]>;

  constructor(db: AngularFirestore) {
    this.promosCollection = db.collection<PromoInter>('promos');
    this.promos = this.promosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id   = a.payload.doc.id;
          return {id, ...data};
        }).sort((n1, n2) => {
          const d1 = (new Date(n1.data.toString().split('-').join('-')));
          const d2 = (new Date(n2.data.toString().split('-').join('-')));
          if (d1 > d2) {
            return 1;
          }
          if (d1 < d2) {
              return -1;
          }
          return 0;
        });
      }
    ));
  }

  getPromos() {
    return this.promos.pipe(map(data =>
      data.filter(promo =>
        (new Date(promo.data.toString().split('-').join('-')) >= new Date())
        && promo.aprovacao === true
      )
    ));
  }

  getPromo(id: string) {
    return this.promosCollection.doc<PromoInter>(id).valueChanges();
  }

  updatePromo(promo: PromoInter, id: string) {
    return this.promosCollection.doc(id).update(promo);
  }

  addPromo(promo: PromoInter) {
    return this.promosCollection.add(promo);
  }

  removePromo(id: string) {
    return this.promosCollection.doc(id).delete();
  }
}
