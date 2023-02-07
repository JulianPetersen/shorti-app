import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(public http:HttpClient) { }


  token:any = localStorage.getItem('token')




}
