import { Component, OnInit } from '@angular/core';
import { HomeEventoInter } from '../models/home-evento.interface';
import { HomeEventoService } from './../services/home-evento.service';
import { HomeNoticiaInter } from './../models/home-noticia.interface';
import { HomeNoticiaService } from './../services/home-noticia.service';
import { HomePromoInter } from './../models/home-promo.interface';
import { HomePromoService } from './../services/home-promo.service';
import { ThemeService } from '../services/theme.service';
import { NavController, LoadingController } from '@ionic/angular';

const themes = {
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876'
  },
  night: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  sliderConfigEventos = {
    slidesPerView: 1.0,
    spaceBetween: 1,
    autoplay: true,
    speed: 1000,
    centeredSlides: true,
  };

  sliderConfigNoticias = {
    slidesPerView: 1.0,
    spaceBetween: 1,
    autoplay: true,
    speed: 1000,
    centeredSlides: true,
  };

  sliderConfigPromos = {
    slidesPerView: 1.0,
    spaceBetween: 1,
    autoplay: true,
    speed: 1000,
    centeredSlides: true,
  };

  eventos: HomeEventoInter[];
  noticias: HomeNoticiaInter[];
  promos: HomePromoInter[];
  eventoOpt: boolean;
  noticiaOpt: boolean;
  promoOpt: boolean;

  constructor(private theme: ThemeService, private EventosService: HomeEventoService,
              private NoticiasService: HomeNoticiaService, private PromosService: HomePromoService,
              private NavCtrl: NavController, private  loadingCtrl: LoadingController) {
                this.eventoOpt  = true;
                this.noticiaOpt = true;
                this.promoOpt   = true;
              }


  ngOnInit() {

    this.EventosService.getEventos().subscribe(resp => {
      if (resp.length > 0) {
        this.eventoOpt = true;
      } else {
        this.eventoOpt = false;
      }
      this.eventos = resp;
    });

    this.NoticiasService.getNoticias().subscribe(resp => {
      if (resp.length > 0) {
        this.noticiaOpt = true;
      } else {
        this.noticiaOpt = false;
      }
      this.noticias = resp;
    });

    this.PromosService.getPromos().subscribe(resp => {
      if (resp.length > 0) {
        this.promoOpt = true;
      } else {
        this.promoOpt = false;
      }
      this.promos = resp;
    });

    if (this.eventoOpt === true || this.noticiaOpt === true || this.promoOpt === true) {
      this.load();
    }
  }

  async load() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    await loading.present();

    loading.dismiss();
  }

  changeTheme(name) {
    name = 'default';
    this.theme.setTheme(themes[name]);
  }

  changeSpeed(val) {
    this.theme.setVariable('--speed', `${val}ms`);
  }

}
