import {IPersonCardContextMenuActions} from "./interfaces";

export const personCardContextMenuActions: Array<IPersonCardContextMenuActions> = [
  { name: 'Открыть', action: 'openPersonCard'},
  { name: 'Изменить', action: 'updatePersonCard'},
  { name: 'Удалить', action: 'deletePersonCard'}
]
