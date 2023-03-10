import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { InfoUser } from '../models/info-user';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InfouserService {

  constructor(private http:HttpClient,public global:GlobalService , private auth:AuthService){}

  getinfoUserByUserId(id:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get(`${this.global.URL}/infouser/${id}`,{headers:headers})
  }

  updateCreditos(id:any, body:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.put(`${this.global.URL}/infouser/${id}`,body,{headers:headers})
  }

  recoveryPassword(body:any){
   
    return this.http.post(`${this.global.URL}/users/recoverypassword`,body)
  }

  changePassword(body:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.post(`${this.global.URL}/users/changepassword`,body,{headers:headers})
  }
}
