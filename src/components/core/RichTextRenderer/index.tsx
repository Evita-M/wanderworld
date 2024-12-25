import React from 'react';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from 'html-react-parser';

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
              <p className='mb-4 last:mb-0'>
                {domToReact(domNode.children as DOMNode[], options)}
              </p>
            );
          case 'h1':
            return (
              <h1 className='mb-4 text-2xl font-bold'>
                {domToReact(domNode.children as DOMNode[], options)}
              </h1>
            );
          case 'h2':
            return (
              <h2 className='mb-3 text-xl font-bold'>
                {domToReact(domNode.children as DOMNode[], options)}
              </h2>
            );
          case 'h3':
            return (
              <h3 className='mb-2 text-lg font-bold'>
                {domToReact(domNode.children as DOMNode[], options)}
              </h3>
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
              <blockquote className='my-4 border-l-4 border-gray-300 pl-4 italic'>
                {domToReact(domNode.children as DOMNode[], options)}
              </blockquote>
            );
        }
      }
    },
  };

  return <div className={className}>{parse(content || '', options)}</div>;
};
