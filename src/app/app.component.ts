import { Component } from '@angular/core';
import { InfoUser } from './models/info-user';
import { InfouserService } from './services/infouser.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private infoUser:InfouserService) {}
}