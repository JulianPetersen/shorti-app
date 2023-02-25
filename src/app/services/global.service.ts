import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private alertController: AlertController,
              private loadingCtrl: LoadingController) { }      
              
              


  // URL:string = "http://localhost:4000/api"
  //prod
  URL:string = "https://shorti.store/api"
  puntosUser:number;
  

  async presentAlert(titulo:string, message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  async showLoading(mensaje:string) {
    
    const loading = await this.loadingCtrl.create({
      message:mensaje,
    });

    loading.present();
  }

  async dismissLoader(){
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 3000);
  }
}
