import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoticiaInter } from './../models/noticia.interface';
import { NoticiaService } from './../services/noticia.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-noticia-detalhes',
  templateUrl: './noticia-detalhes.page.html',
  styleUrls: ['./noticia-detalhes.page.scss'],
})
export class NoticiaDetalhesPage implements OnInit {

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

  noticiaId =  null;

  constructor( private NoticiasService: NoticiaService, private route: ActivatedRoute,
               private NavCtrl: NavController, private  loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.noticiaId = this.route.snapshot.paramMap.get('id');
    if (this.noticiaId) {
      this.loadNoticia();
    }
  }

  async loadNoticia() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    await loading.present();

    this.NoticiasService.getNoticia(this.noticiaId).subscribe(resp => {
      loading.dismiss();
      this.noticia = resp;
    });
  }
}
