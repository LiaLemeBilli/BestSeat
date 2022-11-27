//#region Imports

import { Injectable } from '@angular/core';
import { CourseInteractor } from '../interactors/course/course.interactor';
import { CoursePayload } from '../models/payloads/course.payload';
import { LessonPayload } from '../models/payloads/lessonPayload';
import { ModulePayload } from '../models/payloads/module.payload';
import { CourseModuleProxy } from '../models/proxies/course-module.proxy';
import { CourseProxy } from '../models/proxies/course.proxy';
import { LessonProxy } from '../models/proxies/lesson.proxy';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  //#region Constructors

  constructor(
    private readonly interactor: CourseInteractor,
  ) {}

  //#endregion

  //#region Public Methods

  public async list(name?: string, category?: string, page?: number, limit?: number): Promise<CourseProxy[] | undefined> {
    return await this.interactor.list(name, category, page, limit);
  }

  public async get(id: number): Promise<CourseProxy | undefined> {
    return await this.interactor.get(id);
  }

  public async create(course: CoursePayload): Promise<CourseProxy | undefined> {
    return await this.interactor.create(course);
  }

  public async createModule(module: ModulePayload): Promise<CourseModuleProxy | undefined> {
    return await this.interactor.createModule(module);
  }

  public async updateModule(id: number, module: ModulePayload): Promise<CourseModuleProxy | undefined> {
    return await this.interactor.updateModule(id, module);
  }

  public async deleteModule(id: number): Promise<CourseModuleProxy | undefined> {
    return await this.interactor.deleteModule(id);
  }

  public async createLesson(lesson: LessonPayload): Promise<LessonProxy | undefined> {
    return await this.interactor.createLesson(lesson);
  }

  public async updateLesson(id: number, lesson: LessonPayload): Promise<LessonProxy | undefined> {
    return await this.interactor.updateLesson(id, lesson);
  }

  public async deleteLesson(id: number): Promise<LessonProxy | undefined> {
    return await this.interactor.deleteLesson(id);
  }

  public async update(id: number, course: CoursePayload): Promise<CourseProxy | undefined> {
    return await this.interactor.update(id, course);
  }

  public async delete(id: number): Promise<CourseProxy | undefined> {
    return await this.interactor.delete(id);
  }

  public async favorites(): Promise<CourseProxy[] | undefined> {
    return await this.interactor.favorites();
  }

  public async withProgress(): Promise<CourseProxy[] | undefined> {
    return await this.interactor.withProgress();
  }

  public async getModulesByCourse(courseId: number): Promise<CourseModuleProxy[] | undefined> {
    return await this.interactor.getModulesByCourse(courseId);
  }

  public async getLessonByModule(moduleId: number): Promise<LessonProxy[] | undefined> {
    return await this.interactor.getLessonByModule(moduleId);
  }

  //#endregion

}
