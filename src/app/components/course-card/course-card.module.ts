//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { CourseCardComponent } from './course-card.component';

//#endregion

@NgModule({
  imports: [
    CommonModule,
    HalfCircleSpinnerModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    CourseCardComponent,
  ],
  exports: [
    CourseCardComponent,
  ],
})
export class CourseCardModule {}
