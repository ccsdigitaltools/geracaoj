import { Component, OnInit } from '@angular/core';
import { GrupoInter } from './../models/grupo.interface';
import { GrupoService } from './../services/grupo.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.page.html',
  styleUrls: ['./grupo-cadastro.page.scss'],
})
export class GrupoCadastroPage implements OnInit {

  grupo: GrupoInter = {
    nome: '',
    genero: '',
    tipo: '',
    localidade: '',
    uf: 'RJ',
    foto: '',
    integrantes: '',
    descricao: '',
    musicas: '',
    situacao: 'A',
    aprovacao: false
  };

  constructor(private GruposService: GrupoService, private NavCtrl: NavController,
              private  loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async salvar() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando...'
    });
    await loading.present();
    this.GruposService.addGrupo(this.grupo).then(() => {
      loading.dismiss();
      this.NavCtrl.navigateForward('/');
    });
  }
}
