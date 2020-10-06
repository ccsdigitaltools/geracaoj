import { Component, OnInit } from '@angular/core';
import { NoticiaInter } from './../models/noticia.interface';
import { NoticiaService } from './../services/noticia.service';
import { NavController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-noticia-cadastro',
  templateUrl: './noticia-cadastro.page.html',
  styleUrls: ['./noticia-cadastro.page.scss'],
})
export class NoticiaCadastroPage implements OnInit {

  noticia: NoticiaInter = {
    titulo: '',
    categoria: '',
    autor: '',
    descricao: '',
    foto: '',
    vencimento: null,
    publicacao: null,
    destaque: false,
    tipo: '',
    aprovacao: false
  };

  dataY: string;
  dataX: string;

  constructor(private NoticiasService: NoticiaService, private NavCtrl: NavController,
              private  loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.dataY = moment().add(3, 'days').format('YYYY-MM-DD').toString().split('-').join('-');
    this.dataX = moment().add(1, 'years').format('YYYY').toString().split('-').join('-');
  }

  async salvar() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...'
    });
    await loading.present();
    this.NoticiasService.addNoticia(this.noticia).then(() => {
      loading.dismiss();
      this.NavCtrl.navigateForward('/');
    });
  }
}
