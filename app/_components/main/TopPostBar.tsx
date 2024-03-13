'use client';

import { openModal } from '@/app/_helper/openModal';
import BasicButton from '../common/BasicButton';

const TopPostBar = () => {
  return (
    <>
      <div className="flex items-center justify-between text-sm text-darkFontColor">
        <div
          className="flex items-center"
          onClick={() => openModal('add-post')}
        >
          <div className="bg-gray-100 dark:bg-neutral-800 h-9 w-9 rounded-full" />
          <p className="ml-3">스레드를 시작하세요...</p>
        </div>
        <div className="h-full">
          <BasicButton style="px-4 py-2 opacity-50 pointer-events-none cursor-not-allowed text-white dark:text-black">
            게시
          </BasicButton>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-800 my-4" />
    </>
  );
};

export default TopPostBar;
