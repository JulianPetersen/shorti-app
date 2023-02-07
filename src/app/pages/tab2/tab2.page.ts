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
              private loader:LoadingController,
              private global:GlobalService,
              private infouser:InfouserService) {}


  pronosticosByUser:any[] = []
  pronosticosSinChequear:any[]=[]

  ngOnInit(){
    this.getPronosticosByUser();
    this.obtenerPartidosSinChequear()
    this.calcularPuntos();
    
  }



  user = localStorage.getItem('userId')

  getPronosticosByUser(){
    this.global.showLoading('cargando')
    this.pronostico.getPronosticosByUser(this.user)
      .subscribe({
        next:((res:any[]) => {
          setTimeout(() => {
            
            this.loader.dismiss();
          }, 1500);
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
  
          console.log('partidoChequear', this.pronosticosSinChequear)
         
        }
      }
    }, 2000);
    
  }

  updatePronostico(id:any, pronostico:Pronosticos){
    this.pronostico.updatePronosticoByUser(id,pronostico)
      .subscribe({
        next:((res) => {
          console.log('updated',res)
          this.getPronosticosByUser();
        }),
        error:((err) => {console.log(err)})
      })
      
  }

  updateCreditos(user:any, body:any){
    this.infouser.updateCreditos(user,body)
      .subscribe({
        next : ((res:any) => {
          console.log('los mismisimos puntos',res.puntosObtenidos)
          localStorage.setItem('puntosObtenidos', res.puntosObtenidos)
        })
      })
  }

  calcularPuntos(){
    setTimeout(() => {
      console.log('entrando')
      for(let pronostico of this.pronosticosSinChequear){

        let prediccionEquipo1 = pronostico.prediccion.equipo1
        let prediccionEquipo2 = pronostico.prediccion.equipo2
        let resultadoEquipo1 = pronostico.partido.resultado.equipo1
        let resultadoEquipo2 = pronostico.partido.resultado.equipo2
        if(prediccionEquipo1 == resultadoEquipo1 && prediccionEquipo2 == resultadoEquipo2){
          console.log(pronostico._id)
          let pronosticoUpdated:any = {
            puntosObtenidos : 3
          }
          let actualizarPuntos ={
            puntosObtenidos: 3
          }
          console.log(pronosticoUpdated)
          this.updatePronostico(pronostico._id,pronosticoUpdated)
          this.updateCreditos(this.user, actualizarPuntos)
          
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
}
