import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Partidos } from '../models/partidos';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(public http:HttpClient, private global:GlobalService) { }


  token:any = localStorage.getItem('tokenShortiApp')

  getPartidos(){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.get<Partidos[]>(`${this.global.URL}/partidos`,{headers:headers})
  }

  getPartidosByUser(id:any){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.get<any[]>(`${this.global.URL}/partidos/getPartidosByUser/${id}`,{headers:headers})
  }
 
  updatePartido(id:string, partido:any){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.put<any[]>(`${this.global.URL}/partidos/${id}`,partido,{headers:headers})
  }
}
