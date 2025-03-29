import { FC } from 'react';
import { FeatureItem, FeatureItemProps } from './feature-Item';

interface FeatureListProps {
  features: FeatureItemProps[];
}

export const FeatureList: FC<FeatureListProps> = ({ features }) => {
  return (
    <ul className='grid grid-cols-1 gap-[1.2rem] md:grid-cols-2 xl:grid-cols-4'>
      {features.map((feature) => (
        <li key={feature.title}>
          <FeatureItem {...feature} />
        </li>
      ))}
    </ul>
  );
};
