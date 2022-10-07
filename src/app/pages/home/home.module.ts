//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingModule } from '../../components/loading/loading.module';
import { HomeComponent } from './home.component';

//#endregion

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LoadingModule
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule {}
