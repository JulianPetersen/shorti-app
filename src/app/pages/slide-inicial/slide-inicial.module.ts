import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideInicialPageRoutingModule } from './slide-inicial-routing.module';

import { SlideInicialPage } from './slide-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideInicialPageRoutingModule
  ],
  declarations: [SlideInicialPage]
})
export class SlideInicialPageModule {}
