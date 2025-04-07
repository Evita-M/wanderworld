import { FC } from 'react';
import { FeatureItem, FeatureItemProps } from './feature-Item';

interface FeatureListProps {
  items: FeatureItemProps[];
}

export const FeatureList: FC<FeatureListProps> = ({ items }) => {
  return (
    <ul className='grid grid-cols-1 gap-[2.4rem] md:grid-cols-2 xl:grid-cols-4'>
      {items.map((item) => (
        <li key={item.title}>
          <FeatureItem {...item} />
        </li>
      ))}
    </ul>
  );
};
