import { Children, FC, ReactNode } from 'react';

interface MasonryGridProps {
  columns?: number;
  spacing?: number;
  minHeight?: number;
  children: ReactNode;
}

export const MasonryGrid: FC<MasonryGridProps> = ({
  columns = 3,
  spacing = 2,
  minHeight = 400,
  children
}) => {
  return (
    <div style={{ minHeight }} className="w-full">
      <div
        style={{
          columnCount: columns,
          columnGap: `${spacing * 4}px`,
        }}
      >
        {Children.toArray(children)}
      </div>
    </div>
  );
};

export const MasonryItem: FC<{ children: ReactNode; height: number }> = ({ children, height }) => (
  <div
    className="mb-4 break-inside-avoid"
    style={{ height }}
  >
    <div className="w-full h-full overflow-hidden rounded-lg bg-blue-100">
      {children}
    </div>
  </div>
);

export const MasonryImage: FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-full object-cover"
  />
);
