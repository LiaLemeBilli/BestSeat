//#region Imports

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly router: Router,
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

  public categoryList: string[] = [
    'Artes',
    'Tecnologia',
    'Programação',
    'Educação',
    'Finanças'
  ];

  public activatedCategoryIndex: number | null = null;

  public user: UserProxy | undefined = undefined;

  public highlightedCourse: CourseProxy | null = null;

  public searchContent: string = '';

  public isLogged: boolean = false;

  public isLoadingCourses: boolean = false;

  public isLoading: boolean = false;

  private userSubscription: Subscription;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    this.user = this.userService.getCurrentUser();

    if (this.user)
      this.isLogged = true;

    this.isLoading = true;
    await this.loadCourses();
    this.isLoading = false;
  }

  public ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  public async selectCategory(index: number | null): Promise<void> {
    if (this.activatedCategoryIndex === index) {
      this.activatedCategoryIndex = null;
      return;
    }

    this.activatedCategoryIndex = index;
    await this.loadCourses();
  }

  public async search(searchContent: string): Promise<void> {
    this.searchContent = searchContent;

    await this.loadCourses();
  }

  public async goToCourse(courseId: number | undefined): Promise<void> {
    if (!this.isLogged) {
      this.toastrService.info('É necessário estar logado para acessar um curso', 'Olá, bem vindo');
      return;
    }

    if (courseId)
      await this.router.navigateByUrl('/course/' + courseId.toString());
  }

  public async loadCourses(page?: number, limit?: number): Promise<void> {
    try {
      this.isLoadingCourses = true;

      let categoryFilter = '';
      if (this.activatedCategoryIndex)
        categoryFilter = this.categoryList[this.activatedCategoryIndex];

      const courses = await this.courseService.list(this.searchContent, categoryFilter);

      this.courseList = courses ? courses : [];

      if (this.courseList.length !== 0 && !this.highlightedCourse)
        this.highlightedCourse = this.courseList[0];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção!');
    } finally {
      this.isLoadingCourses = false;
    }
  }

  //#endregion

}
