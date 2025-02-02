import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import parse, { domToReact, Element } from 'html-react-parser';
import { Typography } from '@mui/material';
import { HeadingLevel, RichTextRendererProps, headingVariants } from './types';
import { FC } from 'react';

const renderHeading = (
  level: HeadingLevel,
  children: DOMNode[],
  options: HTMLReactParserOptions
) => {
  return (
    <Typography variant={headingVariants[level]} component={level}>
      {domToReact(children, options)}
    </Typography>
  );
};

export const RichTextRenderer: FC<RichTextRendererProps> = ({
  content,
  className,
}) => {
  if (!content) {
    return null;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (!(domNode instanceof Element)) {
        return;
      }

      const { name, children, parent } = domNode;

      if (name === 'div' && parent instanceof Element && parent.name === 'p') {
        return (
          <span>
            {domToReact(children as DOMNode[], options)}
          </span>
        );
      }

      switch (name) {
        case 'p':
          return (
            <Typography component='p'>
              {domToReact(children as DOMNode[], options)}
            </Typography>
          );
        case 'h1':
        case 'h2':
        case 'h3':
          return renderHeading(name, children as DOMNode[], options);
        case 'ul':
          return (
            <ul role='list' className='mb-4 list-disc pl-6'>
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        case 'ol':
          return (
            <ol role='list' className='mb-4 list-decimal pl-6'>
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        case 'li':
          return (
            <li className='mb-1'>
              {domToReact(children as DOMNode[], options)}
            </li>
          );
        case 'strong':
          return (
            <strong className='font-bold'>
              {domToReact(children as DOMNode[], options)}
            </strong>
          );
        case 'em':
          return (
            <em className='italic'>
              {domToReact(children as DOMNode[], options)}
            </em>
          );
        case 'u':
          return (
            <u className='underline'>
              {domToReact(children as DOMNode[], options)}
            </u>
          );
        case 'blockquote':
          return (
            <blockquote className='border-primary-light my-4 border-l-4 pl-4 italic'>
              {domToReact(children as DOMNode[], options)}
            </blockquote>
          );
        default:
          return undefined;
      }
    },
  };

  try {
    return <div className={className}>{parse(content, options)}</div>;
  } catch (error) {
    console.error('Error parsing rich text content:', error);
    return (
      <div className='text-red-600'>
        Error rendering content. Please try again later.
      </div>
    );
  }
};
