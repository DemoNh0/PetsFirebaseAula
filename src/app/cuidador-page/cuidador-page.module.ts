import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadorPagePageRoutingModule } from './cuidador-page-routing.module';

import { CuidadorPagePage } from './cuidador-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadorPagePageRoutingModule
  ],
  declarations: [CuidadorPagePage]
})
export class CuidadorPagePageModule {}
