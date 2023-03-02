import { Component } from '@angular/core';
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

  constructor(private premio:PremiosService, 
              private infouser:InfouserService,
              private global:GlobalService,
              private sorteRealizado:SorteosRealizadosService) {}

  ngOnInit(){
    this.getUltimoSorteo()
  }

  ionViewWillEnter(){
    this.global.showLoading('cargando')
    this.obtenerDatosusuario();
    this.getInfoPremio();
    this.global.dismissLoader();
    
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
    return true
  }

  getInfoPremio(){
    this.premio.getPremios()
      .subscribe({
        next:((res:any) => {
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
}
