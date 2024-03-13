'use client';

import { useForm } from 'react-hook-form';
import BasicButton from '../common/BasicButton';
import BasicInput from '../common/BasicInput';
import { SignInData } from '@/app/_types/inputType';
import { useMutation } from '@tanstack/react-query';
import { signInWhithEmail } from '@/app/_api/auth';
import ConfirmModal from '../common/ConfirmModal';
import { openModal } from '@/app/_helper/openModal';
import { SIGN_IN_ERROR_MESSAGE } from '@/app/_constant/modalErrorMessage';

const SignInForm = () => {
  const { handleSubmit, control } = useForm<SignInData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = (data: SignInData) => {
    if (data.email === '' || data.password === '') {
      openModal('empty_input');
      return;
    }
    const signInData = {
      email: data.email,
      password: data.password,
    };

    mutate(signInData);
  };

  const { mutate } = useMutation({
    mutationFn: signInWhithEmail,
    onSuccess: (data) => {
      // console.log(data?.error?.message);
      if (data?.error !== null) {
        openModal('incorrect_error_modal');
        return;
      }

      if (!data.data.user?.email || !data.data.user.id) {
        openModal('sign_in_error_modal');
        return;
      }
    },
  });

  return (
    <div className="z-10 flex flex-col items-center w-full">
      <p className="font-semibold">Threads 계정으로 로그인</p>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col mt-3 w-full"
      >
        <BasicInput
          name="email"
          control={control}
          type="email"
          placeholder="이메일 주소"
        />
        <BasicInput
          name="password"
          control={control}
          type="password"
          placeholder="비밀번호"
        />
        <BasicButton style="p-5 my-2" type="submit">
          로그인
        </BasicButton>
      </form>
      {SIGN_IN_ERROR_MESSAGE.map((msg) => (
        <ConfirmModal
          key={msg.modalId}
          modalId={msg.modalId}
          title="로그인 오류"
          content={msg.content}
          confirmText="확인"
        />
      ))}
    </div>
  );
};

export default SignInForm;
