//#region Imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseProxy } from '../../models/proxies/course.proxy';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class CourseInteractor {

  //#region Constructors

  constructor(
    private readonly http: HttpClient
  ) {}

  //#endregion

  //#region Public Methods

  public async list(): Promise<CourseProxy[] | undefined> {
    return await this.http.get<CourseProxy[]>('course').toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async get(id: number): Promise<CourseProxy | undefined> {
    return await this.http.get<CourseProxy>('course/' + id.toString()).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  //#endregion

}
