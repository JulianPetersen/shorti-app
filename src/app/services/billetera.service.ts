import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Retiros } from '../models/retiros';

@Injectable({
  providedIn: 'root'
})
export class BilleteraService {

  constructor(public global:GlobalService, public http:HttpClient) { }


  createRetiro(retiro:Retiros){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.post<Retiros>(`${this.global.URL}/retiros/`,retiro,{headers:headers})
  }

  getRetiroByUser(id:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders ({
      'x-access-token':token
    })
    return this.http.get<Retiros[]>(`${this.global.URL}/retiros/getRetiroByUser/${id}`,{headers:headers})
  }
  
}
