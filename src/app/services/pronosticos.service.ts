import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Pronosticos } from '../models/pronosticos';

@Injectable({
  providedIn: 'root'
})
export class PronosticosService {

  constructor(public http:HttpClient, private global:GlobalService) { }

  token:any = localStorage.getItem('tokenShortiApp')

  createPronostico(pronostico:Pronosticos){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.post<Pronosticos>(`${this.global.URL}/pronosticos`,pronostico,{headers:headers})
  }

  getPronosticosByUser(id:any){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.get<Pronosticos[]>(`${this.global.URL}/pronosticos/getPronosticoByUser/${id}`,{headers:headers})
  }

  updatePronosticoByUser(id:any, pronostico:Pronosticos){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.put(`${this.global.URL}/pronosticos/${id}`,pronostico,{headers:headers})
  }
}
