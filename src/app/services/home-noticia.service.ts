import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeNoticiaInter } from '../models/home-noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeNoticiaService {

  private noticiasCollection: AngularFirestoreCollection<HomeNoticiaInter>;
  private noticias: Observable<HomeNoticiaInter[]>;

  constructor(db: AngularFirestore) {
    this.noticiasCollection = db.collection<HomeNoticiaInter>('noticias');
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

  /*dataFormatada(dData: Date) {
    const data = dData;
    const dia  = data.getDate().toString();
    const diaF = (dia.length === 1) ? '0' + dia : dia;
    const mes  = (data.getMonth() + 1).toString();
    const mesF = (mes.length === 1) ? '0' + mes : mes;
    const anoF = data.getFullYear();
    return anoF + '-' + mesF + '-' + diaF;
  }*/

  getNoticias() {
    return this.noticias.pipe(map(data =>
      data.filter(noticia =>
        (new Date(noticia.vencimento.toString().split('-').join('-')) >= new Date())
        && noticia.destaque === true && noticia.aprovacao === true
      )
    ));
  }

  getNoticia(id: string) {
    return this.noticiasCollection.doc<HomeNoticiaInter>(id).valueChanges();
  }

  updateNoticia(noticia: HomeNoticiaInter, id: string) {
    return this.noticiasCollection.doc(id).update(noticia);
  }

  addNoticia(noticia: HomeNoticiaInter) {
    return this.noticiasCollection.add(noticia);
  }

  removeNoticia(id: string) {
    return this.noticiasCollection.doc(id).delete();
  }
}

