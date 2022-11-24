//#region Imports

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseModuleProxy } from '../../models/proxies/course-module.proxy';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { LessonProxy } from '../../models/proxies/lesson.proxy';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService,
    private readonly courseService: CourseService,
    private readonly activatedRoute: ActivatedRoute,
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

  public selectedModule: CourseModuleProxy | null = null;

  public selectedLesson: LessonProxy | null = null;

  public modules: CourseModuleProxy[] = [];

  public currentLesson: LessonProxy | null = null;

  public isLoadingCourse: boolean = false;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      const user = await this.userService.getCurrentUser();

      if (!user)
        await this.router.navigateByUrl('\home');
    } finally {
      await this.loadCourse();
    }
  }

  public selectModule(module: any): void {
    if (this.selectedModule === module) {
      this.selectedLesson = null;
      this.selectedModule = null;
      return;
    }

    this.selectedModule = module;
    this.selectedLesson = this.selectedModule?.lessons[0] ? this.selectedModule?.lessons[0] : null;
  }

  public async loadCourse(): Promise<void> {
    try {
      this.isLoadingCourse = true;

      const courseId = this.activatedRoute.snapshot.paramMap.get('id');

      if (courseId)
        this.course = await this.courseService.get(+courseId);

      if (!this.course) {
        this.toastrService.warning('Nenhum curso encontrado, tente novamente mais tarde', 'Atenção');
        await this.router.navigateByUrl('\home');
      }

    } catch (e: any) {
      this.toastrService.warning(e.message, 'Atenção');
      await this.router.navigateByUrl('\home');
    } finally {
      this.isLoadingCourse = false;
    }
  }

  //#endregion

}
