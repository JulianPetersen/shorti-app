import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoUser } from 'src/app/models/info-user';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private global:GlobalService, 
    private auth:AuthService, 
    private router:Router) { }

  checkPassword:String = "";
  usuario:User = {
    username:"",
    email:"",
    password:"",
    roles:["user"]
  };
  
  ngOnInit() {
  }

  register(){
    if(this.checkData()){
      this.auth.register(this.usuario)
        .subscribe({
          next :((res:any) => {
            localStorage.setItem('tokenShortiApp',res.token)
            localStorage.setItem('userId', res.userId)
            this.global.presentAlert('Bienvenido', 'Inicie sesión')
            this.router.navigate(['/login'])
          }),
          error:((err)=> {
            console.log(err)
            this.global.presentAlert('Error', err.message)
          })
        })
      
    }
  }

  checkData(){
    if(this.usuario.email === ""){
      this.global.presentAlert('Error', 'Olvido poner un email')
      return false
    }
    if(this.usuario.password === ""){
      this.global.presentAlert('Error', 'Olvido poner una contraseña')
      return false
    }
    if(this.checkPassword === "" || this.checkPassword != this.usuario.password){
      this.global.presentAlert('Error', 'Sus contraseñas no coinciden')
      return false
    }
    return true
  }
}
