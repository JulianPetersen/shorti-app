import { Component, ViewChild } from '@angular/core';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';
import { PremiosService } from 'src/app/services/premios.service';
import { SorteosRealizadosService } from 'src/app/services/sorteos-realizados.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  creditos:number = 0;
  user = localStorage.getItem('userId')
  puntosUsuarios:number;

  participantesDePremio:any;
  participacionesPorusuario:any[] = [];
  cantParticipacionUsuario:number;
  participacionesTotales:number;

  porcentajeEnSorteo:number;
  ultimoGanador:string;
  cantidadUltimoGanador:string
  puntosUser:number;
  @ViewChild(HeaderComponent) header: any;



  constructor(private premio:PremiosService, 
              private infouser:InfouserService,
              private global:GlobalService,
              private sorteRealizado:SorteosRealizadosService) {}

              

  ngOnInit(){
    this.global.showLoading('cargando')
    this.getUltimoSorteo()
    this.obtenerDatosusuario();
    this.getInfoPremio();
    this.global.dismissLoader();
  }

  ionViewWillEnter(){
    this.infoUser();
  }
  
  infoUser(){
    this.infouser.getinfoUserByUserId(this.user)
      .subscribe({
        next: ((res:any) => {
          console.log('infouser',res)
          this.puntosUser = res[0].puntosObtenidos
        })
      })
  }


  obtenerDatosusuario(){
    this.infouser.getinfoUserByUserId(this.user)
      .subscribe({
        next: ((res:any)=> {
          this.puntosUsuarios = res[0].puntosObtenidos
        })
      })
  }

  agregarCreditos(){
    
    if(this.validarCheckout()){
      let updatePremio = {
        cantParticipaciones:this.creditos,
        participantes:this.user
      }
      this.premio.updatePremioByUser(updatePremio)
        .subscribe({
          next: ((res) => {
            
            this.global.presentAlert('Confirmación', 'Puntos Agregados con éxito')
            this.obtenerDatosusuario()
            this.getInfoPremio();
            this.infoUser();
          }),
          error: ((err) => {
            this.global.presentAlert('Error', err.error.message)
          })
      })
    } 
    
  }

  validarCheckout(){
    if(this.creditos > this.puntosUsuarios){
      this.global.presentAlert('Error', 'No tienes suficientes puntos')
      return false
    }
    if(this.creditos == null || this.creditos == 0 || this.creditos == undefined){
      this.global.presentAlert('Error', 'No puedes dejar este campo vacio')
      return false
    }
    if(Math.sign(this.creditos) == -1){
      this.global.presentAlert('Error','Numero ingresado es invalido')
      return false
    }
    if(this.creditos % 1 != 0){
      this.global.presentAlert('Error', 'Por favor ingrese un nuero entero')
      return false
    }
    return true
  }

  getInfoPremio(){
    this.premio.getPremios()
      .subscribe({
        next:((res:any) => {
          this.participacionesPorusuario = []
          this.participantesDePremio = res[0].participantes
          this.participantesDePremio.map((participanteId:any) => {
            if(participanteId == this.user){
              this.participacionesPorusuario.push(participanteId)
            }
          })
          this.cantParticipacionUsuario = this.participacionesPorusuario.length
          this.participacionesTotales = res[0].cantParticipaciones
          console.log('participaciones totales',this.participacionesTotales)
          console.log('cantidadUsuario',this.cantParticipacionUsuario)
          this.calcularPorcentaje();
        }),
        error:((err) => {
          console.log(err)
        })
      })
  }

  calcularPorcentaje(){
    this.porcentajeEnSorteo =Math.round(((this.cantParticipacionUsuario * 100)/ this.participacionesTotales)) ;
    console.log('porcentajeParticipacion', this.porcentajeEnSorteo)
  }

  
  ultimoSorteo:any[] = []
  getUltimoSorteo(){
    this.sorteRealizado.getUltimoSorteo()
      .subscribe({
        next:((res:any) => {
          if(res.length == 0){
            console.log('no se realizaron sorteos aun')
          }else{
            console.log('cargar sorteo', res)
            this.ultimoSorteo = res
            this.cantidadUltimoGanador = res[0].cantidad;
            this.ultimoGanador = res[0].ganador.username
          }

            
        })
      })
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  };

}
