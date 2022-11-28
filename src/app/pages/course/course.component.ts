//#region Imports

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseModuleProxy } from '../../models/proxies/course-module.proxy';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { LessonProxy } from '../../models/proxies/lesson.proxy';
import { UserProxy } from '../../models/proxies/user.proxy';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { getYoutubeEmbedUrl } from '../../utils/functions';

//#endregion

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService,
    private readonly courseService: CourseService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
  ) { }

  //#endregion

  //#region Properties

  public courseId: number = 0;

  public course: CourseProxy | undefined = {
    name: '',
    category: '',
    imageUrl: '',
    description: '',
  };

  public user: UserProxy = {
    name: '',
    imageUrl: '',
    email: '',
    roles: [],
    id: 0
  };

  public selectedModule: CourseModuleProxy | null = null;

  public currentLesson: LessonProxy | null = null;

  public modules: CourseModuleProxy[] = [];

  public isLoadingCourse: boolean = false;

  public favorites: number[] = [];

  public needRegisterInCourse: boolean = false;

  public isFavorite: boolean = false;

  public amountClass: number = 0;

  public embed = getYoutubeEmbedUrl;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      const user = await this.userService.getCurrentUser();

      if (!user)
        await this.router.navigateByUrl('/home');

      this.user = user!;
      this.favorites = this.courseService.getFavorites() || [];
    } finally {
      await this.loadCourse();
    }
  }

  public manageFavoriteCourse(): void {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite)
      this.courseService.saveFavorite(this.courseId);
    else
      this.courseService.removeFavorite(this.courseId);
  }

  public selectModule(module: any): void {
    if (this.selectedModule === module) {
      this.currentLesson = null;
      this.selectedModule = null;
      return;
    }

    this.selectedModule = module;
    this.currentLesson = this.selectedModule?.lessons[0] ? this.selectedModule?.lessons[0] : null;
  }

  public favoriteCourse(): void {
    this.courseService.saveFavorite(this.courseId);
  }

  public removeFavoriteCourse(): void {
    this.courseService.removeFavorite(this.courseId);
  }

  public async loadCourse(): Promise<void> {
    try {
      this.isLoadingCourse = true;

      const courseId = this.activatedRoute.snapshot.paramMap.get('id');

      if (courseId) {
        this.course = await this.courseService.get(+courseId);
        this.courseId = +courseId;

        this.isFavorite = this.favorites.includes(this.courseId);
      }

      if (!this.course) {
        this.toastrService.warning('Nenhum curso encontrado, tente novamente mais tarde', 'Atenção');
        await this.router.navigateByUrl('/home');
        return;
      }

      this.modules = this.course?.modules || [];
      this.modules = this.modules.filter(module => module.lessons.length !== 0);

      this.modules.forEach(m => {
        this.amountClass = this.amountClass + m.lessons.length;
      })

      const registers = await this.courseService.getRegisters(this.user.id) || [];
      const registersCoursesId = registers.map(r => r.courseId);

      if (!registersCoursesId.includes(this.courseId))
        this.needRegisterInCourse = true;
    } catch (e: any) {
      this.toastrService.warning(e.message, 'Atenção');
      await this.router.navigateByUrl('/home');
    } finally {
      this.isLoadingCourse = false;
    }
  }

  public async registerInCourse(): Promise<void> {
    try {
      await this.courseService.registerCourse(this.courseId, this.user.id);
      this.needRegisterInCourse = true;
    } catch (e: any) {
      this.toastrService.warning(e.message, 'Atenção');
      await this.router.navigateByUrl('/home');
    }
  }

  public back(): void {
    this.location.back();
  }

  //#endregion

}
