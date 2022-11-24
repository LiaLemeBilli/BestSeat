//#region Imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursePayload } from '../../models/payloads/course.payload';
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

  public async list(name?: string, page?: number, limit?: number): Promise<CourseProxy[] | undefined> {
    const s = {
      ...(name || name !== '') && { contL: name },
    }

    let url = 'course?s=' + encodeURIComponent(JSON.stringify(s));

    return await this.http.get<CourseProxy[]>(url).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async get(id: number): Promise<CourseProxy | undefined> {
    return await this.http.get<CourseProxy>('course/' + id.toString()).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async create(course: CoursePayload): Promise<CourseProxy | undefined> {
    return await this.http.post<CourseProxy>('course', course).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async update(id: number, course: CoursePayload): Promise<CourseProxy | undefined> {
    return await this.http.put<CourseProxy>('course/' + id.toString(), course).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async delete(id: number): Promise<CourseProxy | undefined> {
    return await this.http.delete<CourseProxy>('course/' + id.toString()).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async favorites(): Promise<CourseProxy[] | undefined> {
    return await this.http.get<CourseProxy[]>('course/favorites').toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async withProgress(): Promise<CourseProxy[] | undefined> {
    return await this.http.get<CourseProxy[]>('course/with-progress').toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  //#endregion

}
