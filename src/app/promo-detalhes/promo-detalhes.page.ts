import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PromoInter } from './../models/promo.interface';
import { PromoService } from './../services/promo.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-promo-detalhes',
  templateUrl: './promo-detalhes.page.html',
  styleUrls: ['./promo-detalhes.page.scss'],
})
export class PromoDetalhesPage implements OnInit {


  promo: PromoInter = {
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

  promoId =  null;

  constructor( private PromosService: PromoService, private route: ActivatedRoute,
               private NavCtrl: NavController, private  loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.promoId = this.route.snapshot.paramMap.get('id');
    if (this.promoId) {
      this.loadNoticia();
    }
  }

  async loadNoticia() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    await loading.present();

    this.PromosService.getPromo(this.promoId).subscribe(resp => {
      loading.dismiss();
      this.promo = resp;
    });
  }

}
