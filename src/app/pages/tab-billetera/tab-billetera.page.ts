import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';

@Component({
  selector: 'app-tab-billetera',
  templateUrl: './tab-billetera.page.html',
  styleUrls: ['./tab-billetera.page.scss'],
})
export class TabBilleteraPage implements OnInit {

  constructor(public infouser:InfouserService, public global:GlobalService) { }

  user = localStorage.getItem('userId')
  dineroUsuario:number;
  dineroRetirar:number;

  ngOnInit() {
    this.getInfoUser();
  }


  getInfoUser(){
    this.infouser.getinfoUserByUserId(this.user)
      .subscribe({
        next: ((res:any)=> {
          console.log(res)
          this.dineroUsuario = res[0].dineroObtenido
        })
      })
  }

  retirarSaldo(){
    try {
      if(this.dineroRetirar > this.dineroUsuario){
        this.global.presentAlert('Error', 'No tienes los fondos suficientes que intentas retirar')
      }else{
        console.log('retirar')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
