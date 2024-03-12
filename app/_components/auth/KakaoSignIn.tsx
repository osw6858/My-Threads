'use client';

import Image from 'next/image';
import KakaoLogo from '../../../public/KakaoTalk_logo.png';
import { useMutation } from '@tanstack/react-query';
import { signInWithKakao } from '@/app/_api/auth';

const KakaoSignIn = () => {
  const { mutate } = useMutation({
    mutationFn: signInWithKakao,
  });

  return (
    <div
      onClick={() => mutate()}
      className="cursor-pointer border border-solid p-5 flex justify-between items-center border-lightFontColor dark:border-darkBorder rounded-xl h-[87px] w-full"
    >
      <Image priority src={KakaoLogo} alt="카카오톡" width={45} height={45} />
      <p className="font-semibold">카카오톡으로 계속</p>
      <div className="border-t-2 border-r-2 border-solid border-gray-600 w-3 h-3 mr-2 rotate-45"></div>
    </div>
  );
};

export default KakaoSignIn;
