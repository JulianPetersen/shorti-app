import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public mnu:MenuController) {}


  openMenu(){
    console.log('open menu')
    this.mnu.open();
  }
}
