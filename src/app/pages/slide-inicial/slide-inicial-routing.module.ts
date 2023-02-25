import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideInicialPage } from './slide-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: SlideInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideInicialPageRoutingModule {}
