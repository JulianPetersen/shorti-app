import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';
import { PremiosService } from 'src/app/services/premios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user = localStorage.getItem('userId');
  datosUser:any;
  username =localStorage.getItem('username');
  valorPremio:number;
  fechaPremio:string;
  

  constructor(
              private premio:PremiosService) { }

  ngOnInit() {
    this.getPremios()
  }
 

  getPremios(){
    this.premio.getPremios()
      .subscribe({
        next: ((res:any )=> {
          console.log('PremioValor',res[0].cantidad);
          this.valorPremio = res[0].cantidad
          this.fechaPremio = res[0].fecha
        })
      })
  }
  
  
}


