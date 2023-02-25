import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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

  constructor(private pronostico:PronosticosService ,
              public loader:LoadingController,
              private global:GlobalService,
              private infouser:InfouserService) {}


  pronosticosByUser:any[] = []
  pronosticosSinChequear:any[]=[]

  ngOnInit(){
    this.global.showLoading('cargando')
    this.getPronosticosByUser();
    this.obtenerPartidosSinChequear()
    this.calcularPuntos();
    this.global.dismissLoader();
    
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
          let pronosticoUpdated:any = {
            puntosObtenidos : 3
          }
          let actualizarPuntos ={
            puntosObtenidos: 3
          }
          console.log(pronosticoUpdated)
          this.updatePronostico(pronostico._id,pronosticoUpdated)
          this.updateCreditos(this.user, actualizarPuntos)
          console.log('puntosActualizados')
        }else {
          console.log(pronostico._id)
          let pronosticoUpdated:Pronosticos = {
            puntosObtenidos : 0
          }
          console.log(pronosticoUpdated)
          this.updatePronostico(pronostico._id,pronosticoUpdated)
        }

      }
    }, 3000);
    
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getPronosticosByUser()
      event.target.complete();
    }, 2000);
  };

}
