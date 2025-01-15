import { Editor } from '@tiptap/react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import UndoIcon from '@mui/icons-material/Undo';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RedoIcon from '@mui/icons-material/Redo';
import CodeIcon from '@mui/icons-material/Code';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { IconButton, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
import { EditorCommand, HistoryCommand, MenuBarButton } from './types';
import { getCommand } from './utils';

export interface MenuBarProps {
  editor?: Editor | null;
  children?: ReactNode;
}

export const MenuBar: FC<MenuBarProps> = ({ editor, children }) => {
  if (!editor) return null;

  const createButton = (
    command: EditorCommand,
    icon: ReactNode
  ): MenuBarButton => ({
    icon,
    command,
    onClick: () => editor.chain().focus()[getCommand(command)]().run(),
    isActive: editor.isActive(command),
    disabled: !editor.can().chain().focus()[getCommand(command)]().run(),
  });

  const buttons: MenuBarButton[] = [
    { command: EditorCommand.Bold, icon: <FormatBoldIcon /> },
    { command: EditorCommand.Underline, icon: <FormatUnderlinedIcon /> },
    { command: EditorCommand.Italic, icon: <FormatItalicIcon /> },
    { command: EditorCommand.Strike, icon: <StrikethroughSIcon /> },
    { command: EditorCommand.Code, icon: <CodeIcon /> },
    { command: EditorCommand.BulletList, icon: <FormatListBulletedIcon /> },
    { command: EditorCommand.OrderedList, icon: <FormatListNumberedIcon /> },
  ].map(({ command, icon }) => createButton(command, icon));

  const historyButtons: MenuBarButton[] = [
    {
      icon: <UndoIcon />,
      command: HistoryCommand.Undo,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <RedoIcon />,
      command: HistoryCommand.Redo,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <Stack direction='row' spacing='1.6rem'>
      {[...buttons, ...historyButtons].map(
        ({ icon, onClick, isActive, disabled }, index) => (
          <IconButton
            key={index}
            onClick={onClick}
            disabled={disabled}
            color={isActive ? 'primary' : 'default'}
          >
            {icon}
          </IconButton>
        )
      )}
      {children}
    </Stack>
  );
};
