import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { FC, useEffect, useState } from 'react';
import Underline from '@tiptap/extension-underline';
import { MenuBar } from './MenuBar';
import './styles.css';
import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

interface RichTextEditorProps {
  onChange: (content: string) => void;
  label?: string;
  value?: string;
  initialContent?: string;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  onChange,
  label,
  value,
  initialContent = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    editorProps: {
      attributes: {
        class: 'max-w-none min-h-[150px] cursor-text rounded-md border p-5',
        style: 'outline: none;',
      },
    },
    immediatelyRender: false,
  });

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== undefined) {
      // Only update if the content is different to prevent cursor jumping
      if (editor.getHTML() !== value) {
        editor.commands.setContent(value);
      }
    }
  }, [editor, value]);

  return (
    <Stack>
      {label && (
        <Typography variant='caption' pb='1.2rem'>
          {label}
        </Typography>
      )}
      <Stack
        p='1.2rem'
        borderRadius='4px'
        spacing={1}
        minHeight='10rem'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          transition: 'all 0.2s ease-in-out',
          outline: `${isFocused ? 2 : 1}px solid ${
            isHovered
              ? theme.palette.primary.light
              : isFocused
                ? theme.palette.primary.main
                : grey[400]
          }`,
          outlineOffset: '-1px',
        }}
      >
        <MenuBar editor={editor} />
        <div className='prose max-w-none'>
          <EditorContent editor={editor} />
        </div>
      </Stack>
    </Stack>
  );
};
