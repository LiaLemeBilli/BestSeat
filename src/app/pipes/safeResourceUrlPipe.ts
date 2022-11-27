//#region Imports

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

//#endregion

/**
 * A classe que representa o pipe que retorna o url "safe"
 */
@Pipe({
  name: 'safeResourceUrl',
})
export class SafeResourceUrlPipe implements PipeTransform {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly sanitizer: DomSanitizer,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método chamado quando é necessário transformar o valor
   *
   * @param url O url a ser "assegurado"
   */
  public transform(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //#endregion

}
