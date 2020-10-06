import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoInter } from './../models/evento.interface';
import { EventoService } from './../services/evento.service';
import { NavController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.page.html',
  styleUrls: ['./evento-cadastro.page.scss'],
})
export class EventoCadastroPage implements OnInit {

  evento: EventoInter = {
    nome: '',
    data: null,
    tema: '',
    descricao: '',
    endereco: '',
    foto: '',
    uf: 'RJ',
    tipo: 'E',
    destaque: false,
    aprovacao: false
  };

  dataY: string;
  dataX: string;

  constructor(private EventosService: EventoService, private route: ActivatedRoute,
              private NavCtrl: NavController, private  loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.dataY = moment().add(3, 'days').format('YYYY-MM-DD').toString().split('-').join('-');
    this.dataX = moment().add(1, 'years').format('YYYY').toString().split('-').join('-');
  }

  async salvar() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...'
    });
    await loading.present();
    this.EventosService.addEvento(this.evento).then(() => {
      loading.dismiss();
      this.NavCtrl.navigateForward('/');
    });
  }

}
