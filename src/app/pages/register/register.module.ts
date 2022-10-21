//#region Imports

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingModule } from '../../components/loading/loading.module';
import { RegisterComponent } from './register.component';

//#endregion

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LoadingModule,
    HttpClientModule
  ],
  declarations: [
    RegisterComponent,
  ],
})
export class RegisterModule {}
