//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { LoadingComponent } from './loading.component';

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
