import { Command, Commands, HistoryCommand } from './types';

export const isHistoryCommand = (command: Command): command is HistoryCommand =>
  command === HistoryCommand.Undo || command === HistoryCommand.Redo;

export const getCommand = (command: Command) =>
  (isHistoryCommand(command)
    ? command
    : `toggle${command.charAt(0).toUpperCase() + command.slice(1)}`) as Commands[typeof command];
