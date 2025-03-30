import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FC, useEffect, useRef, useState, useMemo } from 'react';
import Underline from '@tiptap/extension-underline';

import '../styles.css';
import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { AiButton } from './ai-button';
import { MenuBar } from './menu-bar';

interface RichTextEditorProps {
  onChange: (content: string) => void;
  label?: string;
  value?: string;
  onGenerateDescription?: VoidFunction;
  initialContent?: string;
  isGenerating?: boolean;
  isGenerationEnabled?: boolean;
  readOnly?: boolean;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  onChange,
  label,
  value = '',
  initialContent = '',
  onGenerateDescription,
  isGenerating = false,
  isGenerationEnabled = true,
  readOnly = false,
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
        paragraph: {
          HTMLAttributes: {
            class: 'rich-text-paragraph',
          },
        },
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
      }),
      Underline,
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: value || initialContent,
    editorProps: {
      attributes: {
        class: 'prose-editor',
      },
    },
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
    editable: !readOnly,
    immediatelyRender: false,
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
