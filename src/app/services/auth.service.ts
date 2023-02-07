import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient, public router:Router, public global:GlobalService) { }
  token:any = localStorage.getItem('tokenShortiApp')

  register(user:User){
    return this.http.post(`${this.global.URL}/auth/signup`, user)
  }

  login(user:User){
    return this.http.post(`${this.global.URL}/auth/signin`, user)
  }

  loggedIn(){
    return !!localStorage.getItem('tokenShortiApp');
  }

  getToken(){
    return localStorage.getItem('tokenShortiApp');
  }

  logOut(){
    localStorage.removeItem('tokenShortiApp');
    this.router.navigate(['/login'])
  }


}
