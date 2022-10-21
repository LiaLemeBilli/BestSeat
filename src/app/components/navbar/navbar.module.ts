//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { NavbarComponent } from './navbar.component';

//#endregion

@NgModule({
  imports: [
    CommonModule,
    HalfCircleSpinnerModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class NavbarModule {}
