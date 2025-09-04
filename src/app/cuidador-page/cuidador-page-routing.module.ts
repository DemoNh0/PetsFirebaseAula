import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadorPagePage } from './cuidador-page.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadorPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadorPagePageRoutingModule {}
