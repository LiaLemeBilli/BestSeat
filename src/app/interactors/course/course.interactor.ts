//#region Imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursePayload } from '../../models/payloads/course.payload';
import { LessonPayload } from '../../models/payloads/lessonPayload';
import { ModulePayload } from '../../models/payloads/module.payload';
import { CourseModuleProxy } from '../../models/proxies/course-module.proxy';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { LessonProxy } from '../../models/proxies/lesson.proxy';

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

  public async list(name?: string, category?: string, page?: number, limit?: number): Promise<CourseProxy[] | undefined> {
    const s = {
      ...(name || name !== '') && { contL: name },
      ...(category || category !== '') && { contL: category },
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

  public async createLesson(lesson: LessonPayload): Promise<LessonProxy | undefined> {
    return await this.http.post<LessonProxy>('lesson', lesson).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async updateLesson(id: number, lesson: LessonPayload): Promise<LessonProxy | undefined> {
    return await this.http.post<LessonProxy>('lesson/' + id.toString(), lesson).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async deleteLesson(id: number): Promise<LessonProxy | undefined> {
    return await this.http.delete<LessonProxy>('lesson/' + id.toString()).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async createModule(module: ModulePayload): Promise<CourseModuleProxy | undefined> {
    return await this.http.post<CourseModuleProxy>('module', module).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async updateModule(id: number, module: ModulePayload): Promise<CourseModuleProxy | undefined> {
    return await this.http.post<CourseModuleProxy>('module/' + id.toString(), module).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async deleteModule(id: number): Promise<CourseModuleProxy | undefined> {
    return await this.http.delete<CourseModuleProxy>('module/' + id.toString()).toPromise().catch(error => {
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

  public async getModulesByCourse(id: number): Promise<CourseModuleProxy[] | undefined> {
    const s = {
      courseId: id
    }

    const url = 'modules?s=' + encodeURIComponent(JSON.stringify(s));

    return await this.http.get<CourseModuleProxy[]>(url).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async getLessonByModule(id: number): Promise<LessonProxy[] | undefined> {
    const s = {
      module: id
    }

    const url = 'lessons?s=' + encodeURIComponent(JSON.stringify(s));

    return await this.http.get<LessonProxy[]>(url).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }


  //#endregion

}
