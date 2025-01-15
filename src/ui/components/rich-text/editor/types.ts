import { ReactNode } from 'react';

export enum EditorCommand {
  Bold = 'bold',
  Underline = 'underline',
  Italic = 'italic',
  Strike = 'strike',
  Code = 'code',
  BulletList = 'bulletList',
  OrderedList = 'orderedList',
}

export enum HistoryCommand {
  Undo = 'undo',
  Redo = 'redo',
}

export type Command = EditorCommand | HistoryCommand;

export interface MenuBarButton {
  icon: ReactNode;
  command: Command;
  onClick: VoidFunction;
  isActive: boolean;
  disabled?: boolean;
}

export type ToggleCommands = {
  [K in EditorCommand]: `toggle${Capitalize<K>}`;
};

export type Commands = ToggleCommands & Record<HistoryCommand, HistoryCommand>;
