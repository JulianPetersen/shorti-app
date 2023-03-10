import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
              private alert:AlertController
              ) { }

  

  user:User = {
    email:"",
    password:"",
  };

  emailUser:string;

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
            let slide = localStorage.getItem('slide')
            console.log('slide', slide)
            if(slide == null){
              this.router.navigate(['/slide-inicial'])
              localStorage.setItem('slide', '1')
            }else{
              this.router.navigate(['/home'])
            }

            this.global.dismissLoader();
          }),
          error:((err) => {
            console.log(err)
            this.global.dismissLoader();
            this.global.presentAlert('Error', err.error.message)
          })
            
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

  async recoveryPassword(){
    const alert = await this.alert.create({
      header: 'Recupera tu Email',
      message: 'Ingresa tu Email, en caso de ser correcto, enviaremos las instrucciones para recuperar tu contraseña.',
      inputs: [
        {
          name:'email',
          placeholder: 'Email',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (alertData) => {
           let body = {
            email:this.emailUser
            }
           this.emailUser = alertData.email
           this.infoUser.recoveryPassword(body)
            .subscribe({
              next: ((res:any) =>{
                console.log(res)
              })
            })
          },
        },
      ],
    })
  
    alert.present();
     
  }
}
