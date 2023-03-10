import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Retiros } from 'src/app/models/retiros';
import { AuthService } from 'src/app/services/auth.service';
import { BilleteraService } from 'src/app/services/billetera.service';
import { InfouserService } from 'src/app/services/infouser.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  constructor(private infouser:InfouserService, 
              private auth:AuthService,
              private billetera:BilleteraService,
              private alert:AlertController) { }

  user = localStorage.getItem('userId')
  userData:any
  nombreUser:string
  dineroObtenido:number
  puntosObtenidos:number;

  retirosByUser:Retiros[]=[];

  ngOnInit() {
    this.getInfoUser()
    this.getRetirosByUser()
  }
  

  getInfoUser(){
    this.infouser.getinfoUserByUserId(this.user)
      .subscribe({
        next: ((res:any)=> {
          console.log(res)
          this.userData = res[0]
          this.nombreUser = res[0].usuario.username
          this.dineroObtenido = res[0].dineroObtenido
          this.puntosObtenidos = res[0].puntosObtenidos
        })
      })
  }

  getRetirosByUser(){
    this.billetera.getRetiroByUser(this.user)
      .subscribe({
        next:((res:Retiros[]) => {
          this.retirosByUser = res;
          console.log('retiros',this.retirosByUser)
        })
      })
  }

  logOut(){
    this.auth.logOut()
  }
  

  async changePassword(){
    const alert = await this.alert.create({
      header: 'Cambia de contraseña',
      message: 'Si necesitas cabiar tu constraseña, completa el formulario. Debes recordar tu contraseña actual',
      inputs: [
        {
          name:'oldPassword',
          placeholder: 'Contraseña anterior',
          type:'password'
        },
        {
          name:'newPass',
          placeholder: 'Nueva Contraseña',
          type:'password'
        },
        {
          name:'repeatNewPass',
          placeholder: 'Repita la nueva contraseña',
          type:'password'
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
              id: this.user,
              password: alertData.oldPassword,
              newPassword: alertData.newPass
            }
            this.infouser.changePassword(body)
              .subscribe({
                next: ((res) => {
                  console.log(res)
                }),
                error: (err) => {
                  console.log(err)
                }
              })
          },
        },
      ],
    })
  
    alert.present();
  }
}
