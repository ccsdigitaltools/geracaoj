import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private fcm: FCM, public NavCtrl: NavController, public router: Router) {}

  ngOnInit() {
    this.fcm.getToken().then(token => {
      console.log(token);
    });
  }

  gotoHome() {
    this.router.navigateByUrl('/');
  }

}
