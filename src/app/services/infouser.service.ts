import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { InfoUser } from '../models/info-user';


@Injectable({
  providedIn: 'root'
})
export class InfouserService {

  constructor(private http:HttpClient, private global:GlobalService){}

  token:any = localStorage.getItem('tokenShortiApp')


  getinfoUserByUserId(id:any){
    let headers = new HttpHeaders({
      'x-access-token': this.token
    })
    return this.http.get(`${this.global.URL}/infouser/${id}`,{headers:headers})
  }

  updateCreditos(id:any, body:any){
    let headers = new HttpHeaders({
      'x-access-token':this.token
    })
    return this.http.put(`${this.global.URL}/infouser/${id}`,body,{headers:headers})
  }
}
