import React from 'react';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from 'html-react-parser';
import { Typography } from '@mui/material';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className,
}) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        switch (domNode.name) {
          case 'p':
            return (
              <Typography mt='0.6rem'>
                {domToReact(domNode.children as DOMNode[], options)}
              </Typography>
            );
          case 'h1':
            return (
              <Typography variant='h2' component='h1'>
                {domToReact(domNode.children as DOMNode[], options)}
              </Typography>
            );
          case 'h2':
            return (
              <Typography variant='h3' component='h2'>
                {domToReact(domNode.children as DOMNode[], options)}
              </Typography>
            );
          case 'h3':
            return (
              <Typography variant='h4' component='h2'>
                {domToReact(domNode.children as DOMNode[], options)}
              </Typography>
            );
          case 'ul':
            return (
              <ul className='mb-4 list-disc pl-6'>
                {domToReact(domNode.children as DOMNode[], options)}
              </ul>
            );
          case 'ol':
            return (
              <ol className='mb-4 list-decimal pl-6'>
                {domToReact(domNode.children as DOMNode[], options)}
              </ol>
            );
          case 'li':
            return (
              <li className='mb-1'>
                {domToReact(domNode.children as DOMNode[], options)}
              </li>
            );
          case 'strong':
            return (
              <strong className='font-bold'>
                {domToReact(domNode.children as DOMNode[], options)}
              </strong>
            );
          case 'em':
            return (
              <em className='italic'>
                {domToReact(domNode.children as DOMNode[], options)}
              </em>
            );
          case 'u':
            return (
              <u className='underline'>
                {domToReact(domNode.children as DOMNode[], options)}
              </u>
            );
          case 'blockquote':
            return (
              <blockquote className='border-primary-light my-4 border-l-4 pl-4 italic'>
                {domToReact(domNode.children as DOMNode[], options)}
              </blockquote>
            );
        }
      }
    },
  };

  return <div className={className}>{parse(content || '', options)}</div>;
};
