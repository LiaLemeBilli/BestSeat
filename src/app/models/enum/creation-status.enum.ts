export enum CreationStatusEnum {
  NONE = 0,
  CREATING = 1,
  UPDATING = 2,
}

export const creationRecordText: Record<CreationStatusEnum, string> = {
  [CreationStatusEnum.NONE]: 'Criar',
  [CreationStatusEnum.CREATING]: 'Criando',
  [CreationStatusEnum.UPDATING]: 'Atualizando'
}

export const creationRecordButton: Record<CreationStatusEnum, string> = {
  [CreationStatusEnum.NONE]: '',
  [CreationStatusEnum.CREATING]: 'Criar',
  [CreationStatusEnum.UPDATING]: 'Atualizar'
}
