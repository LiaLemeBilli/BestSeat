//#region Imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ngxalert } from 'ngx-dialogs';
import { ToastrService } from 'ngx-toastr';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { UserProxy } from '../../models/proxies/user.proxy';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly toastrService: ToastrService,
    private readonly courseService: CourseService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  //#endregion

  //#region Properties

  public user: UserProxy | null = {
    id: 0,
    name: '',
    roles: [],
    email: ''
  };

  public errorMessage: string = '';

  public isLoadingCourses: boolean = false;

  public favoriteCourses: CourseProxy[] = [];

  public withProgressCourses: CourseProxy[] = [];

  public favorites: number[] = [];

  public registersCoursesId: number[] = [];

  public alertDialog: Ngxalert = new Ngxalert;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      this.isLoadingCourses = true;

      this.user = this.userService.getCurrentUser() || null;

      this.favorites = this.courseService.getFavorites();
      const registers = await this.courseService.getRegisters(this.user?.id!) || [];
      this.registersCoursesId = registers.map(r => r.courseId);

      const courses = await this.courseService.list();

      this.favoriteCourses = courses?.filter(c => this.favorites.includes(c.id!)) || [];
      this.withProgressCourses =  courses?.filter(c => this.registersCoursesId.includes(c.id!)) || [];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção');
    } finally {
      this.isLoadingCourses = false;
    }
  }

  public async logout(): Promise<void> {
    this.alertDialog.create({
      id: 'alert',
      title: 'Deseja realmente deslogar?',
      customCssClass: 'dialog-class',
      strict: false,
      type: 'S',
      buttons: [
        {
          title: 'Sim',
          class: 'dialog-class--cancel',
          event: async () => {
            this.userService.logout();
            this.alertDialog.removeAlert('alert');
            await this.router.navigateByUrl('/home')
          }
        },
        {
          title: 'Cancelar',
          class: 'dialog-class--confirm',
          event: () => {
            this.alertDialog.removeAlert('alert');
          }
        },
      ]
    });
  }

  //#endregion

}
