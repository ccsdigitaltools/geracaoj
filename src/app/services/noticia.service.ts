import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoticiaInter } from '../models/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private noticiasCollection: AngularFirestoreCollection<NoticiaInter>;
  private noticias: Observable<NoticiaInter[]>;

  constructor(db: AngularFirestore) {
    this.noticiasCollection = db.collection<NoticiaInter>('noticias');
    this.noticias = this.noticiasCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id   = a.payload.doc.id;
          return {id, ...data};
        }).sort((n1, n2) => {
          const d1 = (new Date(n1.vencimento.toString().split('-').join('-')));
          const d2 = (new Date(n2.vencimento.toString().split('-').join('-')));
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

  getNoticias() {
    return this.noticias.pipe(map(data =>
      data.filter(noticia =>
        (new Date(noticia.vencimento.toString().split('-').join('-')) >= new Date())
        && noticia.aprovacao === true
      )
    ));
  }

  getNoticia(id: string) {
    return this.noticiasCollection.doc<NoticiaInter>(id).valueChanges();
  }

  updateNoticia(noticia: NoticiaInter, id: string) {
    return this.noticiasCollection.doc(id).update(noticia);
  }

  addNoticia(noticia: NoticiaInter) {
    return this.noticiasCollection.add(noticia);
  }

  removeNoticia(id: string) {
    return this.noticiasCollection.doc(id).delete();
  }
}

