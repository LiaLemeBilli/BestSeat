export enum CreationStatusEnum {
  TO_CREATE = 0,
  CREATING = 1,
  UPDATING = 2,
}

export const creationRecordText: Record<CreationStatusEnum, string> = {
  [CreationStatusEnum.TO_CREATE]: 'Criar',
  [CreationStatusEnum.CREATING]: 'Criando',
  [CreationStatusEnum.UPDATING]: 'Atualizando'
}

export const creationRecordColor: Record<CreationStatusEnum, string> = {
  [CreationStatusEnum.TO_CREATE]: 'black',
  [CreationStatusEnum.CREATING]: '#C61F79',
  [CreationStatusEnum.UPDATING]: 'purple'
}

export const creationRecordButton: Record<CreationStatusEnum, string> = {
  [CreationStatusEnum.TO_CREATE]: '',
  [CreationStatusEnum.CREATING]: 'Criar',
  [CreationStatusEnum.UPDATING]: 'Atualizar'
}
