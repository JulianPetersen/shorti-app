import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Partidos } from '../models/partidos';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(public http:HttpClient, private global:GlobalService,public auth:AuthService) { }




  getPartidos(){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get<Partidos[]>(`${this.global.URL}/partidos`,{headers:headers})
  }


  getLastTenPartidos(){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get<Partidos[]>(`${this.global.URL}/partidos/getlastenpartidos`,{headers:headers})
  }


  getPartidosByUser(id:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get<any[]>(`${this.global.URL}/partidos/getPartidosByUser/${id}`,{headers:headers})
  }
 
  updatePartido(id:string, partido:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.put<any[]>(`${this.global.URL}/partidos/${id}`,partido,{headers:headers})
  }
}
