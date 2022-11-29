//#region Imports

import { Injectable } from '@angular/core';
import { CourseInteractor } from '../interactors/course/course.interactor';
import { CoursePayload } from '../models/payloads/course.payload';
import { LessonPayload } from '../models/payloads/lessonPayload';
import { ModulePayload } from '../models/payloads/module.payload';
import { CourseModuleProxy } from '../models/proxies/course-module.proxy';
import { CourseProxy } from '../models/proxies/course.proxy';
import { LessonProxy } from '../models/proxies/lesson.proxy';
import { UserCourseProxy } from '../models/proxies/user-course.proxy';
import { StorageService } from './storage.service';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  //#region Constructors

  constructor(
    private readonly storageService: StorageService,
    private readonly interactor: CourseInteractor,
  ) {}

  //#endregion

  //#region Public Methods

  public async list(name?: string, category?: string): Promise<CourseProxy[] | undefined> {
    return await this.interactor.list(name, category);
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
    let lessons = await this.interactor.getLessonByModule(moduleId);

    lessons = lessons?.filter(x => x.courseModuleId === moduleId)

    return lessons;
  }

  public saveFavorite(courseId: number): void {
    const favorites: number[] = this.storageService.getItem<number[]>('FAVORITES').success || [];

    const indexToRemove = favorites.findIndex(x => x === courseId);

    if (indexToRemove !== -1)
      return;

    favorites.push(courseId);

    this.storageService.setItem<number[]>('FAVORITES', favorites);
  }

  public removeFavorite(courseId: number): void {
    const favorites: number[] = this.storageService.getItem<number[]>('FAVORITES').success || [];

    const indexToRemove = favorites.findIndex(x => x === courseId);

    if (indexToRemove === -1)
      return;

    favorites.splice(indexToRemove, 1);

    this.storageService.setItem<number[]>('FAVORITES', favorites);
  }

  public getFavorites(): number[] {
    return this.storageService.getItem<number[]>('FAVORITES').success || [];
  }

  public async registerCourse(courseId: number, userId: number): Promise<void> {
    return await this.interactor.registerCourse(courseId, userId);
  }

  public async getRegisters(userId: number): Promise<UserCourseProxy[] | undefined> {
    return await this.interactor.getRegisters(userId);
  }

  //#endregion

}
