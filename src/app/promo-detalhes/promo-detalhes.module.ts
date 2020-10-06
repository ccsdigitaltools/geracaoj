import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PromoDetalhesPage } from './promo-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: PromoDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PromoDetalhesPage]
})
export class PromoDetalhesPageModule {}
