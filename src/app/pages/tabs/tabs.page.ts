import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LocalnotificationService } from 'src/app/services/localnotification.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  public user = localStorage.getItem('userId')
  constructor(public mnu:MenuController,
              public router:Router,
              public localNotification:LocalnotificationService) {}


  

  ionViewWillEnter(){
    this.getNotifications();
  }            
              
  cantoNotification:number = 0;

  openMenu(){
    console.log('open menu')
    this.mnu.open();
  }

  goNotifications(){
    this.router.navigateByUrl('/notifications')
  }

  getNotifications(){
    this.localNotification.getNotifications(this.user)
      .subscribe({
        next: ((res:any) => {
          console.log('notifications',res);
          this.cantoNotification = res.length;
        })
      })
  }

}
