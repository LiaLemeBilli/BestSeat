//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { SearchBarInputComponent } from './search-bar-input.component';

//#endregion

@NgModule({
  imports: [
    CommonModule,
    HalfCircleSpinnerModule,
    FormsModule,
  ],
  declarations: [
    SearchBarInputComponent,
  ],
  exports: [
    SearchBarInputComponent,
  ],
})
export class SearchBarInputModule {}
