import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { FC, useEffect, useRef, useState, useMemo } from 'react';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';
import { MenuBar } from './MenuBar';
import './styles.css';
import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { AiButton } from './AiButton';

interface RichTextEditorProps {
  onChange: (content: string) => void;
  label?: string;
  value?: string;
  onGenerateDescription?: VoidFunction;
  initialContent?: string;
  isGenerating?: boolean;
  isGenerationEnabled?: boolean;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  onChange,
  label,
  value = '',
  initialContent = '',
  onGenerateDescription,
  isGenerating = false,
  isGenerationEnabled = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isUpdatingRef = useRef(false);
  const previousValueRef = useRef(value);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
      }),
      Underline,
      Bold.configure({
        HTMLAttributes: {
          class: 'font-bold',
        },
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: value || initialContent,
    onUpdate: ({ editor }) => {
      if (isUpdatingRef.current) {
        return;
      }
      const content = editor.getHTML();
      if (content !== previousValueRef.current) {
        previousValueRef.current = content;
        requestAnimationFrame(() => {
          onChange(content);
        });
      }
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    editorProps: {
      attributes: {
        class:
          'max-w-none min-h-[150px] cursor-text rounded-md p-5 prose-editor',
        style: `outline: none; font-family: ${theme.typography.fontFamily}; font-size: ${theme.typography.body1.fontSize}; line-height: ${theme.typography.body1.lineHeight};`,
      },
    },
  });

  useEffect(() => {
    if (!editor || value === previousValueRef.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      try {
        isUpdatingRef.current = true;
        editor.commands.setContent(value);
        previousValueRef.current = value;
      } finally {
        isUpdatingRef.current = false;
      }
    }, 0);

    return () => clearTimeout(timeoutId);
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
        borderRadius={theme.borderRadius.small}
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
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <MenuBar editor={editor}>
          {onGenerateDescription && (
            <AiButton
              onClick={onGenerateDescription}
              label='Generate'
              tooltipText='Generate description with AI'
              disabled={!isGenerationEnabled}
              isLoading={isGenerating}
              sx={{ minWidth: '12.8rem' }}
            />
          )}
        </MenuBar>
        <div className='prose-editor'>
          <EditorContent editor={editor} />
        </div>
      </Stack>
    </Stack>
  );
};
