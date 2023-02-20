import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { InfouserService } from 'src/app/services/infouser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public global:GlobalService,
              public auth:AuthService, 
              public router:Router,
              public infoUser:InfouserService,
              private loader:LoadingController,
              ) { }

  

  user:User = {
    email:"",
    password:"",
  };


  ngOnInit() {
  }


  login(){
    this.global.showLoading('cargando')
    if(this.checkData()){
      this.auth.login(this.user)
        .subscribe({
          next: ((res:any) => {
            console.log(res)
            localStorage.setItem('token',res.token)
            localStorage.setItem('userId', res.userId)
            localStorage.setItem('username', res.username)

              this.router.navigate(['/home'])

            this.global.dismissLoader();
          }),
          error:((err) => {
            console.log(err)
            this.global.dismissLoader();})
          
        })
        
      
    }
  }


  checkData(){
    if(this.user.email == ""){
      this.global.presentAlert('Faltan datos', 'Verifique haber ingresado un nombre de usuario')
      return false
    }
    if (this.user.password == ""){
      this.global.presentAlert('Faltan datos', 'Verifique haber ingresado una contraseña')
      return false
    }
    return true
  }
}
