import { GuideHeader } from '@/entities/guide/ui/guide-header/guide-header';
import { FC } from 'react';
import { Language } from '@/shared/types/language';

interface GuideItemProps {
  fullName: string;
  languages: Language[];
  avatarSrc: string;
  id: string;
  email: string;
  onClick: VoidFunction;
}

export const GuideItem: FC<GuideItemProps> = ({
  fullName,
  languages,
  avatarSrc,
  email,
  onClick,
}) => {
  return (
    <div onClick={onClick} className='cursor-pointer border-b border-gray-200'>
      <GuideHeader
        fullName={fullName}
        languages={languages}
        avatarSrc={avatarSrc}
        email={email}
      />
    </div>
  );
};
