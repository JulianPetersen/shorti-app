import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalnotificationService } from 'src/app/services/localnotification.service';
import { TabsPageModule } from '../tabs/tabs.module';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  constructor(public localNotifications:LocalnotificationService) { }

  alllocalNotifications:any[] = []
  public user = localStorage.getItem('userId')
  viewPoint:boolean;
  

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getlocalNotifications();
    
  }

  getlocalNotifications(){
    this.localNotifications.getNotifications(this.user)
      .subscribe({
        next: ((res:any) => {
          this.alllocalNotifications = res;
          console.log(this.alllocalNotifications)
        })
      })
  }


  readNotifications(notificationId:string){
    console.log(notificationId)
    let body = {
      notificationId:notificationId,
      userId: this.user
    }

    this.localNotifications.updateReadNotification(body)
      .subscribe({
        next: ((res) => {
          console.log(res)
          this.getlocalNotifications();
          
        })
      })
  }



}
