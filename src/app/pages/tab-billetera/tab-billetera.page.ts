import { Component, OnInit } from '@angular/core';
import { Retiros } from 'src/app/models/retiros';
import { BilleteraService } from 'src/app/services/billetera.service';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';

@Component({
  selector: 'app-tab-billetera',
  templateUrl: './tab-billetera.page.html',
  styleUrls: ['./tab-billetera.page.scss'],
})
export class TabBilleteraPage implements OnInit {

  constructor(public infouser:InfouserService, 
              public global:GlobalService,
              public billetera:BilleteraService) { }

  user = localStorage.getItem('userId')
  dineroUsuario:number;
  dineroRetirar:number = 0;
  nombreUser:string;
  apellidoUser:string;
  cbuUser:string;
  aliasUser:string

  ngOnInit() {
  }

  ionViewWillEnter(){
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
    if(this.verificarData()){
      let fecha = new Date()
      let today = fecha.toDateString();
      let newRetiro:Retiros = {
      usuario:this.user,
      nombre:this.nombreUser,
      apellido:this.apellidoUser,
      cbu:this.cbuUser,
      alias:this.aliasUser,
      monto:this.dineroRetirar,
      fecha: today
    }
    
    try {
      if(this.dineroRetirar > this.dineroUsuario){
        this.global.presentAlert('Error', 'No tienes los fondos suficientes que intentas retirar')
      }else{
        this.global.showLoading('cargando')
          this.billetera.createRetiro(newRetiro)
          .subscribe({
            next:((res) => {
              this.global.dismissLoader()
              console.log(res)
              this.global.presentAlert('Felicitaciones', 'Realizaste tu retiro, tené en cuenta que algunas transferencias pueden demorar hasta 7 dias. Muchas gracias.')
              this.getInfoUser()
              this.limpiarData();
            })
          })
        }
    } catch (error) {
      console.log(error)
    }
    }
    
  }

  limpiarData(){
    this.nombreUser = ""
    this.apellidoUser =""
    this.dineroRetirar =0
    this.cbuUser = ""
    this.aliasUser=""
  }

  verificarData(){
    if(this.dineroRetirar == 0 || this.dineroRetirar == null || this.dineroRetirar == undefined){
      this.global.presentAlert('Error', 'Debes ingresar la cantidad a retirar')
      return false
    }
    if(this.nombreUser == "" || this.nombreUser == undefined){
      this.global.presentAlert('Error', 'Debes Ingresar un nombre')
      return false
    }
    if(this.apellidoUser == "" || this.apellidoUser == undefined){
      this.global.presentAlert('Erro', 'debes ingresar un apellido')
      return false
    }
    if(this.cbuUser == ""  || this.cbuUser == undefined ){
      this.global.presentAlert('Error', 'Debes Ingresar un cbu Para poder realizar la transferencia de fondos')
    }
    if(this.aliasUser == ""  || this.aliasUser == undefined ){
      this.global.presentAlert('Error', 'Debes Ingresar un Alias Para poder realizar la transferencia de fondos')
    }
    return true
  }
}
