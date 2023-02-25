import { Component, OnInit } from '@angular/core';
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
              private billetera:BilleteraService) { }

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
}
