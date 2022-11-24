//#region Imports

import { Injectable } from '@angular/core';
import { CourseInteractor } from '../interactors/course/course.interactor';
import { CoursePayload } from '../models/payloads/course.payload';
import { CourseProxy } from '../models/proxies/course.proxy';

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

  public async list(name?: string, page?: number, limit?: number): Promise<CourseProxy[] | undefined> {
    return await this.interactor.list(name, page, limit);
  }

  public async get(id: number): Promise<CourseProxy | undefined> {
    return await this.interactor.get(id);
  }

  public async create(course: CoursePayload): Promise<CourseProxy | undefined> {
    return await this.interactor.create(course);
  }

  public async update(id: number, course: CoursePayload): Promise<CourseProxy | undefined> {
    return await this.interactor.update(id, course);
  }

  public async delete(id: number): Promise<CourseProxy | undefined> {
    return await this.interactor.delete(id);
  }

  //#endregion

}
