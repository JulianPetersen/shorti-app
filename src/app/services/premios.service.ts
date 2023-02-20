import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PremiosService {

  constructor(private http:HttpClient, private global:GlobalService, public auth:AuthService) { }
  
  

  getPremios(){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get(`${this.global.URL}/premio`,{headers:headers})
  }

  updatePremioByUser(body:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.put(`${this.global.URL}/premio`,body,{headers:headers})
  }
}
