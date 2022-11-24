//#region Imports

import { Injectable } from '@angular/core';
import { CourseInteractor } from '../interactors/course/course.interactor';
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

  public async list(): Promise<CourseProxy[] | undefined> {
    return await this.interactor.list();
  }

  public async get(id: number): Promise<CourseProxy | undefined> {
    return await this.interactor.get(id);
  }

  //#endregion

}
