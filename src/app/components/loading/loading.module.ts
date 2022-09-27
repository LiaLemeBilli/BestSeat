//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';

//#endregion

@NgModule({
  imports: [
    CommonModule,
    HalfCircleSpinnerModule,
  ],
  declarations: [
    LoadingComponent,
  ],
  exports: [
    LoadingComponent,
  ],
})
export class LoadingModule {}
