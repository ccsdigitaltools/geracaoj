import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeEventoInter } from '../models/home-evento.interface';
import { EventoInter } from '../models/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeEventoService {
  private eventosCollection: AngularFirestoreCollection<HomeEventoInter>;
  private eventos: Observable<HomeEventoInter[]>;

  constructor(db: AngularFirestore) {
    this.eventosCollection = db.collection<HomeEventoInter>('eventos');
    this.eventos = this.eventosCollection.snapshotChanges().pipe(map(
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

  /*dataFormatada(dData: Date) {
    const data = dData;
    const dia  = data.getDate().toString();
    const diaF = (dia.length === 1) ? '0' + dia : dia;
    const mes  = (data.getMonth() + 1).toString();
    const mesF = (mes.length === 1) ? '0' + mes : mes;
    const anoF = data.getFullYear();
    return anoF + '-' + mesF + '-' + diaF;
  }*/

  getEventos() {
    return this.eventos.pipe(map(data =>
      data.filter(evento =>
        (new Date(evento.data.toString().split('-').join('-')) >= new Date())
        && evento.tipo === 'E' && evento.destaque === true && evento.aprovacao === true
      )
    ));
  }

  getEvento(id: string) {
    return this.eventosCollection.doc<HomeEventoInter>(id).valueChanges();
  }

  updateEvento(evento: HomeEventoInter, id: string) {
    return this.eventosCollection.doc(id).update(evento);
  }

  addEvento(evento: HomeEventoInter) {
    return this.eventosCollection.add(evento);
  }

  removeEvento(id: string) {
    return this.eventosCollection.doc(id).delete();
  }
}
