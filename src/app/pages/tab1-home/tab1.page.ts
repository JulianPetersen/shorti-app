import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { InfoUser } from 'src/app/models/info-user';
import { Pronosticos } from 'src/app/models/pronosticos';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { PronosticosService } from 'src/app/services/pronosticos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public partidos:PartidosService,
              private pronosticos:PronosticosService,
              public global:GlobalService,
              public loader:LoadingController,
              public infouser:InfouserService) {}


  partidosObtained:any = [];
  partidosHabilitados:any[] = [];
  equipo1Goles:number = 0;
  equipo2Goles:number = 0;
  ultimosPartiodos:any[] = []
  lastPartidosJugados:any[] = []
  puntosUser:number;
  
  user = localStorage.getItem('userId');
  @ViewChild(HeaderComponent) header: any;
  
  ngOnInit(){
    
    this.getPartidosByUser()
    this.getPartidos();
    this.getlastTenPartidos()
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


  getPartidos(){
    this.partidos.getPartidos()
      .subscribe({
        next: ((res) => {
          console.log(res)
          this.ultimosPartiodos = res;
      })
    })
  }

  async getPartidosByUser(){
    this.global.showLoading('cargando')
    this.partidosHabilitados = []
    console.log(this.user)
    this.partidos.getPartidosByUser(this.user)
      .subscribe((res:any)=> {
        this.global.dismissLoader()
        this.partidosObtained = res
        for(let partido of this.partidosObtained){
          if(partido.estado === "Habilitado"){
            this.partidosHabilitados.push(partido);    
          }
        }
        console.log(this.partidosHabilitados)
        
      })
  }

  sumarEquipo1(equipo:any){
    console.log(equipo)
    if(equipo.resultado.equipo1 == -1){
      equipo.resultado.equipo1 == 0
    }
    equipo.resultado.equipo1 += 1

  }

  sumarEquipo2(equipo:any){
    equipo.resultado.equipo2 += 1
  }

  restarEquipo1(equipo:any){
    equipo.resultado.equipo1 -= 1
    if(equipo.resultado.equipo1 == -1){
      equipo.resultado.equipo1 = 0
    }
  }

  restarEquipo2(equipo:any){
    equipo.resultado.equipo2 -= 1
    if(equipo.resultado.equipo2 == -1){
      equipo.resultado.equipo2 = 0
    }
  }

  enviarPronostico(Partido:any){
    this.partidosHabilitados = []
    let pronostico:Pronosticos ={
        partido: Partido._id,
        usuario:this.user,
        prediccion:{
          equipo1: Partido.resultado.equipo1,
          equipo2:Partido.resultado.equipo2
        }
    }
    
    this.pronosticos.createPronostico(pronostico)
      .subscribe({
        next:((res) => {
          console.log(res)
          this.getPartidosByUser();
        }),
        error:((err) => {
          console.log(err)
        })
      })

      
  }

  
  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  };




  getlastTenPartidos(){
    this.partidos.getLastTenPartidos()
      .subscribe({
        next:((res) => {
          this.lastPartidosJugados = res
          console.log('last ten', this.lastPartidosJugados)
        })
      })
  }

}
