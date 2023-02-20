import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SorteosRealizadosService {

  constructor(public http:HttpClient, public global:GlobalService) { }

  getUltimoSorteo(){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get(`${this.global.URL}/sorteoRealizado`,{headers:headers})
  }
}
