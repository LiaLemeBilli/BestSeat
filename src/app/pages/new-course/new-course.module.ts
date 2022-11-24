//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingModule } from '../../components/loading/loading.module';
import { CourseCardModule } from '../../components/course-card/course-card.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { NewCourseComponent } from './new-course.component';
import { SearchBarInputModule } from 'src/app/components/search-bar-input/search-bar-input.module';

//#endregion

const routes: Routes = [{ path: '', component: NewCourseComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LoadingModule,
    NavbarModule,
    CourseCardModule,
    SearchBarInputModule,
  ],
  declarations: [
    NewCourseComponent,
  ],
})
export class NewCourseModule {}
