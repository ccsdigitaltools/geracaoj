import { Component, OnInit } from '@angular/core';
import { EventoInter } from './../models/evento.interface';
import { EventoService } from './../services/evento.service';
import { ThemeService } from '../services/theme.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  sliderConfig = {
    slidesPerView: 1.0,
    spaceBetween: 10,
    centeredSlides: true
  };
  eventos: EventoInter[];

  splash = true;

  constructor(private theme: ThemeService, private EventosService: EventoService, public NavCtrl: NavController, private router: Router) {

  }

  ngOnInit() {
    /*this.EventosService.getEventos().subscribe(res => this.eventos = res);*/
    const tabBar = document.getElementById('myTabBar');
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    setTimeout(() => {
       this.splash = false;
       this.NavCtrl.navigateRoot(['/']);
    }, 8000);
  }

  changeTheme(name) {
    name = 'default';
    this.theme.setTheme(themes[name]);
  }

  changeSpeed(val) {
    this.theme.setVariable('--speed', `${val}ms`);
  }

}
