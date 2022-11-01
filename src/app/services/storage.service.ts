import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  //#region  Constructor

  constructor() {
    this.storage = window.localStorage;
  }

  //#endregion

  //#region Private Properties

  private storage: Storage;

  //#endregion

  //#region Public Methods

  public setItem<T>(key: string, item: T): void {
    this.storage.setItem(key, JSON.stringify(item));
  }

  public getItem<T>(key: string): StorageResult<T> {
    const item = this.storage.getItem(key);

    if (!item) {
      return  {
        success: undefined,
        error: {
          message: 'Nenhum item encontrado.'
        }
      }
    }

    return {
      success: JSON.parse(item) as T,
    }

  }

  public clear(): void {
    this.storage.clear();
  }

  //#endregion

}

//#region Interfaces

export interface StorageResult<T> {
  success?: T;
  error?: { message: string };
}

//#endregion
