//#region Imports

import { Component, OnDestroy, OnInit } from '@angular/core';
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

  public isLoading: boolean = false;

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

  private async loadCourses(): Promise<void> {
    try {
      this.isLoading = true;
      const courses = await this.courseService.list();

      this.courseList = courses ? courses : [];

      if (this.courseList.length !== 0)
        this.highlightedCourse = this.courseList[0];
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

}
