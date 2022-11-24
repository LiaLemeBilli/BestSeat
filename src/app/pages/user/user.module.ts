//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingModule } from '../../components/loading/loading.module';
import { CourseCardModule } from '../../components/course-card/course-card.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { UserComponent } from './user.component';

//#endregion

const routes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LoadingModule,
    NavbarModule,
    CourseCardModule,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule {}
