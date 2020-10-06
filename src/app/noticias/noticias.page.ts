import { Component, OnInit } from '@angular/core';
import { NoticiaInter } from '../models/noticia.interface';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: NoticiaInter[];
  noticiaOpt: boolean;
  constructor(private NoticiasService: NoticiaService) {
    this.noticiaOpt = true;
  }

  ngOnInit() {

    this.NoticiasService.getNoticias().subscribe(resp => {
      if (resp.length > 0) {
        this.noticiaOpt = true;
      } else {
        this.noticiaOpt = false;
      }
      this.noticias = resp;
    });
  }


}
