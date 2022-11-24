//#region Imports

import { Component, OnInit } from '@angular/core';
import {
  creationRecordButton,
  creationRecordColor,
  creationRecordText,
  CreationStatusEnum
} from '../../models/enum/creation-status.enum';
import { LessonPayload } from '../../models/payloads/lessonPayload';
import { CoursePayload } from '../../models/payloads/course.payload';
import { ModulePayload } from '../../models/payloads/module.payload';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { CourseService } from '../../services/course.service';

//#endregion

@Component({
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly courseService: CourseService,
  ) { }

  //#endregion

  //#region Properties

  public errorMessage: string = '';

  public isLoading: boolean = false;

  public isLoadingCourseList: boolean = false;

  public isLoadingCourseToEdit: boolean = false;

  public courseList: CourseProxy[] = [];

  public course: CoursePayload = {
    author: '',
    category: '',
    description: '',
    modules: [],
    name: '',
  }

  public courseIdToEdit: number = 0;

  public creationStatusEnum: typeof CreationStatusEnum = CreationStatusEnum;

  public creationStatus: CreationStatusEnum = CreationStatusEnum.TO_CREATE;

  public creationStatusText: Record<CreationStatusEnum, string> = creationRecordText;

  public creationStatusColor: Record<CreationStatusEnum, string> = creationRecordColor;

  public creationStatusButton: Record<CreationStatusEnum, string> = creationRecordButton;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    await this.loadCourses();
  }

  public addNewModule(): void {
    const moduleToAdd: ModulePayload = {
      id: null,
      title: '',
      lessons: [],
      order: 0,
      isOpened: false,
    }

    this.course.modules?.push(moduleToAdd);
  }

  public async editCourse(courseId: number | undefined): Promise<void> {
    if (!courseId)
      return;

    this.creationStatus = CreationStatusEnum.UPDATING;
    this.courseIdToEdit = courseId;

    try {
      this.isLoadingCourseToEdit = true;
      const course = await this.courseService.get(courseId) as CoursePayload;

      course.modules = course.modules?.map(module => {
        const newModule = module as ModulePayload;

        newModule.lessons = newModule.lessons?.map(lesson => {
          return lesson as LessonPayload;
        });

        return newModule;
      });

      this.course = course;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoadingCourseToEdit = false;
    }
  }

  public addNewCourse(moduleIndex: number): void {
    const classToAdd: LessonPayload = {
      id: null,
      isOpened: false,
      name: '',
      description: '',
      contentUrl: '',
      order: 0,
    }

    if (this.course.modules)
      this.course.modules[moduleIndex].lessons?.push(classToAdd);
  }

  public removeClass(moduleIndex: number, classIndex: number): void {
    if (this.course.modules) {
      const newModule = this.course.modules[moduleIndex];

      if (newModule.lessons)
        newModule.lessons.splice(classIndex, 1);

      this.course.modules[moduleIndex] = newModule;
    }
  }

  public removeModule(moduleIndex: number): void {
    if (this.course.modules && this.course.modules[moduleIndex])
      this.course.modules?.splice(moduleIndex, 1);
  }

  public trackBy(index: number, value: any) {
    return index;
  }

  public changeStatus(status: CreationStatusEnum): void {
    this.creationStatus = status;
  }

  public async createOrUpdateCourse(): Promise<void> {
    this.creationStatus = CreationStatusEnum.TO_CREATE;
  }

  public disableStatus(): void {
    setTimeout(() => {
      this.creationStatus = CreationStatusEnum.TO_CREATE
    }, 100);

    this.course = {
      author: '',
      category: '',
      description: '',
      modules: [],
      name: '',
    }
  }

  public trackByClass(index: number, mClass: LessonPayload) {
    return mClass.description;
  }

  private async loadCourses(): Promise<void> {
    try {
      this.isLoadingCourseList = true;
      const courses = await this.courseService.list();

      this.courseList = courses ? courses : [];
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoadingCourseList = false;
    }
  }

  //#endregion

}
