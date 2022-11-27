//#region Imports

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserLoginPayload } from '../../models/payloads/user-login.payload';
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

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      this.isLoadingCourses = true;

      this.favorites = this.courseService.getFavorites();

      const courses = await this.courseService.list();
      this.user = this.userService.getCurrentUser() || null;

      this.favoriteCourses = courses?.filter(c => this.favorites.includes(c.id!)) || [];
      this.withProgressCourses = courses || [];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção');
    } finally {
      this.isLoadingCourses = false;
    }
  }

  //#endregion

}
