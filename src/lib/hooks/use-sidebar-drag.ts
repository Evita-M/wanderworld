import { useState, useRef, useEffect } from 'react';

interface UseSidebarDragProps {
  initialIsOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export const useSidebarDrag = ({
  initialIsOpen,
  onToggle,
}: UseSidebarDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startIsOpen = useRef(initialIsOpen);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startIsOpen.current = initialIsOpen;
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = startX.current - currentX;
    const threshold = 50;

    if (startIsOpen.current) {
      if (diff > threshold) {
        onToggle(false);
        setIsDragging(false);
        document.body.style.userSelect = '';
      }
    } else {
      if (diff < -threshold) {
        onToggle(true);
        setIsDragging(false);
        document.body.style.userSelect = '';
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return {
    isDragging,
    handleMouseDown,
  };
};
