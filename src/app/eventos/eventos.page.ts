import { Component, OnInit } from '@angular/core';
import { EventoInter } from './../models/evento.interface';
import { EventoService } from './../services/evento.service';


@Component({
  selector: 'app-eventos',
  templateUrl: 'eventos.page.html',
  styleUrls: ['eventos.page.scss']
})
export class EventosPage implements OnInit {

  eventos: EventoInter[];
  eventoOpt: boolean;
  constructor(private EventosService: EventoService) {
    this.eventoOpt = true;
  }

  ngOnInit() {

    this.EventosService.getEventos().subscribe(resp => {
      if (resp.length > 0) {
        this.eventoOpt = true;
      } else {
        this.eventoOpt = false;
      }
      this.eventos = resp;
    });
  }

}

