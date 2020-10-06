import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GrupoInter } from './../models/grupo.interface';
import { GrupoService } from './../services/grupo.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-grupo-detalhes',
  templateUrl: './grupo-detalhes.page.html',
  styleUrls: ['./grupo-detalhes.page.scss'],
})
export class GrupoDetalhesPage implements OnInit {

  grupo: GrupoInter = {
    nome: '',
    genero: '',
    tipo: '',
    localidade: '',
    uf: '',
    foto: '',
    integrantes: '',
    descricao: '',
    musicas: '',
    situacao: '',
    aprovacao: false
  };

  grupoId =  null;
  htmlObject = '';

  constructor( private GruposService: GrupoService, private route: ActivatedRoute,
               private NavCtrl: NavController, private  loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.grupoId = this.route.snapshot.paramMap.get('id');
    if (this.grupoId) {
      this.loadGrupo();
    }
  }

  async loadGrupo() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    await loading.present();

    this.GruposService.getGrupo(this.grupoId).subscribe(resp => {
      loading.dismiss();
      this.grupo = resp;
      document.getElementById('play').innerHTML = resp.musicas;
    });
  }

}
