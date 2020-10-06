import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrupoInter } from '../models/grupo.interface';


@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private gruposCollection: AngularFirestoreCollection<GrupoInter>;
  private grupos: Observable<GrupoInter[]>;

  constructor(db: AngularFirestore) {
    this.gruposCollection = db.collection<GrupoInter>('grupos');
    this.grupos = this.gruposCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id   = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }


  getGrupos() {
    return this.grupos.pipe(map(data =>
      data.filter(grupo =>
        grupo.uf === 'RJ' && grupo.situacao === 'A' && grupo.aprovacao === true
      )
    ));
  }

  getGrupo(id: string) {
    return this.gruposCollection.doc<GrupoInter>(id).valueChanges();
  }

  updateGrupo(grupo: GrupoInter, id: string) {
    return this.gruposCollection.doc(id).update(grupo);
  }

  addGrupo(grupo: GrupoInter) {
    return this.gruposCollection.add(grupo);
  }

  removeGrupo(id: string) {
    return this.gruposCollection.doc(id).delete();
  }
}
