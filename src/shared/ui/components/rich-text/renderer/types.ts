export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const headingVariants: Record<
  HeadingLevel,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> = {
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'h6',
};
