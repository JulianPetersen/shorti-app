import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Pronosticos } from 'src/app/models/pronosticos';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';
import { PremiosService } from 'src/app/services/premios.service';
import { PronosticosService } from 'src/app/services/pronosticos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(HeaderComponent) header: any;

  constructor(private pronostico:PronosticosService ,
              public loader:LoadingController,
              private global:GlobalService,
              private infouser:InfouserService) {}

  
  pronosticosByUser:any[] = []
  pronosticosSinChequear:any[]=[]
  pronosticoUpdated:any;
  actualizarPuntos:any;
  puntosUser:number;

  ngOnInit(){
    this.global.showLoading('cargando')
    this.getPronosticosByUser();
    this.obtenerPartidosSinChequear()
    this.calcularPuntos();
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


  user = localStorage.getItem('userId')
  getPronosticosByUser(){
    this.pronostico.getPronosticosByUser(this.user)
      .subscribe({
        next:((res:any[]) => {
          this.pronosticosByUser = res
          console.log(this.pronosticosByUser)
        }),
        error:((err) => {console.log(err)})
      })
  }

  obtenerPartidosSinChequear(){
    setTimeout(() => {
      for(let pronostico of this.pronosticosByUser){
        if(pronostico.puntosObtenidos == null && pronostico.partido.estado === 'Finalizado'){
          this.pronosticosSinChequear.push(pronostico)
  
        }
      }
    }, 2000);
    
  }

  updatePronostico(id:any, pronostico:Pronosticos){
    this.pronostico.updatePronosticoByUser(id,pronostico)
      .subscribe({
        next:((res) => {
          this.getPronosticosByUser();
        }),
        error:((err) => {console.log(err)})
      })
      
  }

  updateCreditos(user:any, body:any){
    this.infouser.updateCreditos(user,body)
      .subscribe({
        next : ((res:any) => {
          console.log('ActualizacionPuntos',res.puntosObtenidos)
        })
      })
  }

  calcularPuntos(){
    setTimeout(() => {

      for(let pronostico of this.pronosticosSinChequear){
        let prediccionEquipo1 = pronostico.prediccion.equipo1
        let prediccionEquipo2 = pronostico.prediccion.equipo2
        let resultadoEquipo1 = pronostico.partido.resultado.equipo1
        let resultadoEquipo2 = pronostico.partido.resultado.equipo2
        if(prediccionEquipo1 == resultadoEquipo1 && prediccionEquipo2 == resultadoEquipo2){
          this.pronosticoUpdated = {
            puntosObtenidos : 3
          }
          this.actualizarPuntos ={
            puntosObtenidos: 3
          }
          console.log(this.pronosticoUpdated)
          this.updatePronostico(pronostico._id,this.pronosticoUpdated)
          this.updateCreditos(this.user, this.actualizarPuntos)
          console.log('puntosActualizados')
         }

        if (prediccionEquipo1 != resultadoEquipo1 || prediccionEquipo2 != resultadoEquipo2){
          console.log('no acierta resultado')
          if(resultadoEquipo1 == resultadoEquipo2 && prediccionEquipo1 == prediccionEquipo2){
            console.log('empate acertado')
            this.pronosticoUpdated = {
              puntosObtenidos : 1
            }
            this.actualizarPuntos ={
              puntosObtenidos: 1
            }
            this.updatePronostico(pronostico._id,this.pronosticoUpdated)
            this.updateCreditos(this.user, this.actualizarPuntos)
            console.log('puntosActualizados')
          }else if(prediccionEquipo1 < prediccionEquipo2 && resultadoEquipo1 < resultadoEquipo2){
            console.log('ganador equipo2 acertado')
            this.pronosticoUpdated = {
              puntosObtenidos : 1
            }
            this.actualizarPuntos ={
              puntosObtenidos: 1
            }
              this.updatePronostico(pronostico._id,this.pronosticoUpdated)
              this.updateCreditos(this.user, this.actualizarPuntos)
              console.log('puntosActualizados')
          }else if(prediccionEquipo1 > prediccionEquipo2 && resultadoEquipo1 > resultadoEquipo2){
            console.log('ganador equipo1 acertado')
            this.pronosticoUpdated = {
              puntosObtenidos : 1
            }
            this.actualizarPuntos ={
              puntosObtenidos: 1
            }
            this.updatePronostico(pronostico._id,this.pronosticoUpdated)
            this.updateCreditos(this.user, this.actualizarPuntos)
            console.log('puntosActualizados')
          }else{
            console.log(pronostico._id)
          let pronosticoUpdated:Pronosticos = {
            puntosObtenidos : 0
          }
          console.log(pronosticoUpdated)
          this.updatePronostico(pronostico._id,pronosticoUpdated)
          }
        }
      }
    }, 3000);
    
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  };

}
