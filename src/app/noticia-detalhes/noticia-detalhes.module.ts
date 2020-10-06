import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoticiaDetalhesPage } from './noticia-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: NoticiaDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoticiaDetalhesPage]
})
export class NoticiaDetalhesPageModule {}
