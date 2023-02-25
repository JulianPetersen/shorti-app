import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabBilleteraPageRoutingModule } from './tab-billetera-routing.module';

import { TabBilleteraPage } from './tab-billetera.page';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabBilleteraPageRoutingModule,
    ComponentsModule,

  ],
  declarations: [TabBilleteraPage]
})
export class TabBilleteraPageModule {}
