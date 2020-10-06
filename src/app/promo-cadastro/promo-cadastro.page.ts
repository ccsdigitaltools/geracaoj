import { Component, OnInit } from '@angular/core';
import { PromoInter } from './../models/promo.interface';
import { PromoService } from './../services/promo.service';
import { NavController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-promo-cadastro',
  templateUrl: './promo-cadastro.page.html',
  styleUrls: ['./promo-cadastro.page.scss'],
})
export class PromoCadastroPage implements OnInit {

  promo: PromoInter = {
    nome: '',
    data: null,
    tema: '',
    descricao: '',
    endereco: '',
    foto: '',
    uf: 'RJ',
    tipo: '',
    destaque: false,
    aprovacao: false
  };

  dataY: string;
  dataX: string;

  constructor(private PromosService: PromoService, private NavCtrl: NavController,
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
    this.PromosService.addPromo(this.promo).then(() => {
      loading.dismiss();
      this.NavCtrl.navigateForward('/');
    });
  }

}
