'use client';

import { resetPassword } from '@/app/_api/auth';
import BasicButton from '@/app/_components/common/BasicButton';
import ConfirmModal from '@/app/_components/common/ConfirmModal';
import Footer from '@/app/_components/common/Footer';
import TextNav from '@/app/_components/common/TextNav';
import TopLogo from '@/app/_components/icons/TopLogo';
import { END_POINT } from '@/app/_constant/endPoint';
import { RESET_PASSWORD } from '@/app/_constant/queryKeys';
import { openModal } from '@/app/_helper/openModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: [RESET_PASSWORD],
    mutationFn: resetPassword,
  });

  const handleSubmit = () => {
    mutate(email);
    setEmail('');
    openModal('send-password-reset-email');
  };

  return (
    <>
      <p className="font-semibold mb-3">비밀번호 변경</p>
      <input
        className="my-1 p-5 w-full rounded-xl h-14 bg-lightInput dark:placeholder:text-darkFontColor dark:bg-darkInput dark:outline-darkBorder"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <BasicButton
        style={`w-full p-5 mt-3 ${
          email ? 'cursor-pointer' : 'pointer-events-none opacity-80'
        }`}
        onClick={handleSubmit}
      >
        제출
      </BasicButton>
      <TextNav title="돌아가기" style="mt-5" href={END_POINT.ROOT} />
      <Footer />
    </>
  );
};

export default ResetPassword;
