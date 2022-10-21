//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CourseCardModule } from '../../components/course-card/course-card.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SearchBarInputModule } from '../../components/search-bar-input/search-bar-input.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { HomeComponent } from './home.component';

//#endregion

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LoadingModule,
    SearchBarInputModule,
    NavbarModule,
    CourseCardModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule {}
