'use client';

import { updatePassword } from '@/app/_api/auth';
import BasicButton from '@/app/_components/common/BasicButton';
import ConfirmModal from '@/app/_components/common/ConfirmModal';
import { SIGN_UP_ERROR_MESSAGE } from '@/app/_constant/modalErrorMessage';
import { UPDATE_PASSWORD } from '@/app/_constant/queryKeys';
import { openModal } from '@/app/_helper/openModal';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UpdatePassword = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: [UPDATE_PASSWORD],
    mutationFn: updatePassword,
  });

  const handleSubmit = () => {
    if (password !== passwordCheck) {
      openModal('missmatch-password');
      return;
    }
    if (password.length < 5) {
      openModal('password-lenght-error');
      return;
    }

    mutate(password);
    setPassword('');
    openModal('update-passowrd');
  };

  return (
    <>
      <p className="font-semibold mb-3">새로운 비밀번호</p>
      <input
        className="my-1 p-5 w-full rounded-xl h-14 bg-lightInput dark:placeholder:text-darkFontColor dark:bg-darkInput dark:outline-darkBorder"
        type="password"
        placeholder="변경할 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="my-1 p-5 w-full rounded-xl h-14 bg-lightInput dark:placeholder:text-darkFontColor dark:bg-darkInput dark:outline-darkBorder"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <BasicButton
        style={`w-full p-5 mt-3 ${
          password ? 'cursor-pointer' : 'pointer-events-none opacity-80'
        }`}
        onClick={handleSubmit}
      >
        제출
      </BasicButton>

      <ConfirmModal
        modalId="update-passowrd"
        title="비밀번호 변경 성공"
        content="비밀번호 변경 완료"
        confirmText="확인"
        onConfirm={() => router.push('/')}
      />

      {SIGN_UP_ERROR_MESSAGE.map((msg) => (
        <ConfirmModal
          key={msg.modalId}
          modalId={msg.modalId}
          title="비밀번호 오류"
          content={msg.content}
          confirmText="확인"
        />
      ))}
    </>
  );
};

export default UpdatePassword;
