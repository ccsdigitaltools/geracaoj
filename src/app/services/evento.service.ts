import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoInter } from '../models/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventosCollection: AngularFirestoreCollection<EventoInter>;
  private eventos: Observable<EventoInter[]>;

  constructor(db: AngularFirestore) {
    this.eventosCollection = db.collection<EventoInter>('eventos');
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


  getEventos() {
    return this.eventos.pipe(map(data =>
      data.filter(evento =>
        (new Date(evento.data.toString().split('-').join('-')) >= new Date()) && evento.tipo === 'E' && evento.aprovacao === true
      )
    ));
  }



  getEvento(id: string) {
    return this.eventosCollection.doc<EventoInter>(id).valueChanges();
  }

  updateEvento(evento: EventoInter, id: string) {
    return this.eventosCollection.doc(id).update(evento);
  }

  addEvento(evento: EventoInter) {
    return this.eventosCollection.add(evento);
  }

  removeEvento(id: string) {
    return this.eventosCollection.doc(id).delete();
  }
}
