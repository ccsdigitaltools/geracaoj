import { Component, OnInit } from '@angular/core';
import { GrupoInter } from './../models/grupo.interface';
import { GrupoService } from './../services/grupo.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  grupos: GrupoInter[];
  grupoOpt: boolean;
  constructor(private GruposService: GrupoService) {
    this.grupoOpt = true;
  }

  ngOnInit() {

    this.GruposService.getGrupos().subscribe(resp => {
      if (resp.length > 0) {
        this.grupoOpt = true;
      } else {
        this.grupoOpt = false;
      }
      this.grupos = resp;
    });
  }

}
