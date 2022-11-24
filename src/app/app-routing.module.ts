import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'new-course', loadChildren: () => import('./pages/new-course/new-course.module').then(m => m.NewCourseModule) },
  { path: 'course/:id', loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
