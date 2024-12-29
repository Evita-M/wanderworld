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

interface MenuBarProps {
  editor: Editor | null;
  children?: ReactNode;
}

export const MenuBar: FC<MenuBarProps> = ({ editor, children }) => {
  if (!editor) return null;

  const buttons = [
    {
      icon: <FormatBoldIcon />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      icon: <FormatUnderlinedIcon />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
    },
    {
      icon: <FormatItalicIcon />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <StrikethroughSIcon />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <CodeIcon />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <FormatListBulletedIcon />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
    },
    {
      icon: <FormatListNumberedIcon />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <UndoIcon />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive('undo'),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <RedoIcon />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive('redo'),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <Stack direction='row' spacing={1}>
      {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
        <IconButton
          key={index}
          onClick={onClick}
          disabled={disabled}
          color={isActive ? 'primary' : 'default'}
        >
          {icon}
        </IconButton>
      ))}
      {children}
    </Stack>
  );
};
