import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventoInter } from './../models/evento.interface';
import { EventoService } from './../services/evento.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.page.html',
  styleUrls: ['./evento-detalhes.page.scss'],
})
export class EventoDetalhesPage implements OnInit {
  evento: EventoInter = {
    nome: '',
    data: null,
    tema: '',
    descricao: '',
    endereco: '',
    foto: '',
    uf: '',
    tipo: '',
    destaque: false,
    aprovacao: false
  };

  eventoId =  null;

  constructor( private EventosService: EventoService, private route: ActivatedRoute,
               private NavCtrl: NavController, private  loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.eventoId = this.route.snapshot.paramMap.get('id');
    if (this.eventoId) {
      this.loadEvento();
    }
  }

  async loadEvento() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    await loading.present();

    this.EventosService.getEvento(this.eventoId).subscribe(resp => {
      loading.dismiss();
      this.evento = resp;
    });
  }

}
