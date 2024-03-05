'use client';

import { useForm } from 'react-hook-form';
import BasicButton from '../common/BasicButton';
import BasicInput from '../common/BasicInput';
import { SignInData } from '@/app/_types/inputType';
import { useMutation } from '@tanstack/react-query';
import { signInWhithEmail } from '@/app/_api/auth';
import ConfirmModal from '../common/ConfirmModal';
import { openModal } from '@/app/_helper/openModal';

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
        <BasicButton type="submit">로그인</BasicButton>
      </form>
      <ConfirmModal
        modalId="empty_input"
        title="로그인 오류"
        content="비밀번호와 이메일을 모두 입력해 주세요."
        confirmText="확인"
      />
      <ConfirmModal
        modalId="incorrect_error_modal"
        title="로그인 오류"
        content="이메일과 비밀번호를 다시 확인해 주세요."
        confirmText="확인"
      />
      <ConfirmModal
        modalId="sign_in_error_modal"
        title="로그인 오류"
        content="로그인중 오류가 발생했습니다. 잠시후 다시 시도해 주세요."
        confirmText="확인"
      />
    </div>
  );
};

export default SignInForm;
