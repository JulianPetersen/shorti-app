import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class LocalnotificationService {

  constructor(public http:HttpClient,public global:GlobalService) { }



  getNotifications(id:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get(`${this.global.URL}/localNotification/notificationByUser/${id}`,{headers:headers})
  }

  getAllNotifications(){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.get(`${this.global.URL}/localNotification`,{headers:headers})
  }

  updateReadNotification(body:any){
    let token:any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'x-access-token':token
    })
    return this.http.put(`${this.global.URL}/localNotification/updateReadUser`,body,{headers:headers})
  }
}
