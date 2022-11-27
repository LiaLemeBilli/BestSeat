//#region

import { formatDate } from '@angular/common';

//#endregion

export function isValidEmail(email: string): boolean {
  const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  return regex.test(email);
}

export function getYoutubeEmbedUrl(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  const id = (match && match[2].length === 11)
    ? match[2]
    : null;

  return 'https://www.youtube.com/embed/' + id
}

export function isValidPassword(password: string): boolean {
  return (password && password.trim().length >= 6) as boolean;
}

export function isValidCpf(cpf: string): boolean {
  cpf = cpf
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('-', '');

  if (cpf.length !== 11)
    return false;

  if ((cpf === '00000000000') || (cpf === '11111111111') || (cpf === '22222222222') || (cpf === '33333333333') || (cpf === '44444444444') || (cpf === '55555555555') || (cpf === '66666666666') || (cpf === '77777777777') || (cpf === '88888888888') || (cpf === '99999999999'))
    return false;

  let numero: number = 0;
  let caracter: string = '';
  const numeros: string = '0123456789';
  let j: number = 10;
  let somatorio: number = 0;
  let resto: number = 0;
  let digito1: number = 0;
  let digito2: number = 0;
  let cpfAux: string = '';

  cpfAux = cpf.substring(0, 9);

  for (let i: number = 0; i < 9; i++) {
    caracter = cpfAux.charAt(i);

    if (numeros.search(caracter) === -1)
      return false;

    numero = Number(caracter);
    somatorio = somatorio + (numero * j);
    j--;
  }

  resto = somatorio % 11;
  digito1 = 11 - resto;

  if (digito1 > 9)
    digito1 = 0;

  j = 11;
  somatorio = 0;
  cpfAux = cpfAux + digito1;

  for (let i: number = 0; i < 10; i++) {
    caracter = cpfAux.charAt(i);
    numero = Number(caracter);
    somatorio = somatorio + (numero * j);
    j--;
  }

  resto = somatorio % 11;
  digito2 = 11 - resto;

  if (digito2 > 9)
    digito2 = 0;

  cpfAux = cpfAux + digito2;

  return cpf === cpfAux;
}

export function pastTime(date: Date): string {
  const now: Date = new Date();
  date = new Date(date);

  let timeUnit: string = 'seg';
  let time: number = (now.valueOf() - date.valueOf()) / (1000);

  if (time < 0)
    throw new Error('Data invalida');

  if (time >= 60) {
    timeUnit = 'min';
    time = time / 60;
  } else {
    return 'Há ' + Math.round(time).toString() + ' ' + timeUnit;
  }

  if (time >= 60) {
    timeUnit = 'hora(s)';
    time = time / 60;
  } else {
    return 'Há ' + Math.round(time).toString() + ' ' + timeUnit;
  }

  if (time >= 24) {
    timeUnit = 'dia(s)';
    time = time / 24;
  } else {
    return 'Há ' + Math.round(time).toString() + ' ' + timeUnit;
  }

  if (time >= 7) {
    timeUnit = 'sem.';
    time = time / 7;
  } else {
    return 'Há ' + Math.round(time).toString() + ' ' + timeUnit;
  }

  if (time > 4)
    return formatDate(date, 'dd/MM/yyyy', 'pt-BR').toString();

  return '';
}
