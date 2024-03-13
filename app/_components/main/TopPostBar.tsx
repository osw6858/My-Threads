'use client';

import { openModal } from '@/app/_helper/openModal';
import BasicButton from '../common/BasicButton';

const TopPostBar = () => {
  return (
    <div className="flex items-center justify-between text-sm text-darkFontColor">
      <div className="flex items-center" onClick={() => openModal('add-post')}>
        <div className="bg-neutral-800 h-9 w-9 rounded-full" />
        <p className="ml-3">스레드를 시작하세요...</p>
      </div>
      <div className="h-full">
        <BasicButton style="px-4 py-2 opacity-50 pointer-events-none cursor-not-allowed">
          게시
        </BasicButton>
      </div>
    </div>
  );
};

export default TopPostBar;
