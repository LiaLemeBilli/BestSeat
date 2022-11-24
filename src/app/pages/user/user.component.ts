//#region Imports

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserLoginPayload } from '../../models/payloads/user-login.payload';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { CourseService } from '../../services/course.service';

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
  ) { }

  //#endregion

  //#region Properties

  public userLogin: UserLoginPayload = {
    email: '',
    password: '',
  }

  public errorMessage: string = '';

  public isLoadingCourses: boolean = false;

  public favoriteCourses: CourseProxy[] = [];

  public withProgressCourses: CourseProxy[] = [];

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      this.isLoadingCourses = true;

      const [favorites, withProgress] = await Promise.all([
        this.courseService.favorites(),
        this.courseService.withProgress(),
      ]);

      this.favoriteCourses = favorites || [];
      this.withProgressCourses = withProgress || [];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção');
    } finally {
      this.isLoadingCourses = false;
    }
  }

  //#endregion

}
