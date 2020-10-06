import { Component, OnInit } from '@angular/core';
import { PromoInter } from './../models/promo.interface';
import { PromoService } from './../services/promo.service';

@Component({
  selector: 'app-promos',
  templateUrl: 'promos.page.html',
  styleUrls: ['promos.page.scss']
})
export class PromosPage implements OnInit {

  promos: PromoInter[];
  promoOpt: boolean;
  constructor(private PromosService: PromoService) {
    this.promoOpt = true;
  }

  ngOnInit() {

    this.PromosService.getPromos().subscribe(resp => {
      if (resp.length > 0) {
        this.promoOpt = true;
      } else {
        this.promoOpt = false;
      }
      this.promos = resp;
    });
  }
}
