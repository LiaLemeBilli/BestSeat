//#region Imports

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { UserProxy } from '../../models/proxies/user.proxy';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {

  //#region Constructors

  constructor(
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly toastrService: ToastrService,
  ) {
    this.userSubscription = this.userService.getCurrentUser$().subscribe(user => {
      this.user = user;

      if (this.user)
        this.isLogged = true;
    })
  }

  //#endregion

  //#region Properties

  public courseList: CourseProxy[] = [];

  public user: UserProxy | undefined = undefined;

  public highlightedCourse: CourseProxy = {
    name: '',
    description: '',
    category: '',
    imageUrl: '',
  };

  public isLogged: boolean = false;

  public isLoadingCourses: boolean = false;

  private userSubscription: Subscription;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    this.user = this.userService.getCurrentUser();

    if (this.user)
      this.isLogged = true;

    await this.loadCourses();
  }

  public ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  public async loadCourses(searchContent?: string, page?: number, limit?: number): Promise<void> {
    try {
      this.isLoadingCourses = true;
      const courses = await this.courseService.list(searchContent, page, limit);

      this.courseList = courses ? courses : [];

      if (this.courseList.length !== 0)
        this.highlightedCourse = this.courseList[0];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção!');
    } finally {
      this.isLoadingCourses = false;
    }
  }

  //#endregion

}
