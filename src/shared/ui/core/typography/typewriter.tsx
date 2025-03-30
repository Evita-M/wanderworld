'use client';

import {
  useState,
  useEffect,
  FC,
  ReactNode,
  isValidElement,
  cloneElement,
} from 'react';

interface TypewriterProps {
  children: ReactNode;
  infinite?: boolean;
  delay?: number;
}

export const Typewriter: FC<TypewriterProps> = ({
  children,
  delay = 100,
  infinite = false,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract text from children if it's a valid React element and contains text
  const text =
    isValidElement(children) && typeof children.props.children === 'string'
      ? children.props.children
      : '';

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      // Reset for infinite loop
      setCurrentIndex(0);
      setCurrentText('');
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  // Render Typography with the typewriter effect
  return isValidElement(children)
    ? cloneElement(children, {}, currentText)
    : null;
};
