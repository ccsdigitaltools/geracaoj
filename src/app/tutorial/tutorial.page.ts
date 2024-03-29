import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private storage: Storage, private router: Router, private NavCtrl: NavController) { }

  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.NavCtrl.navigateRoot(['/']);
  }

  ngOnInit() {
  }

}
