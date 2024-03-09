'use client';

import { SignUpData } from '@/app/_types/inputType';
import { useForm } from 'react-hook-form';
import BasicInput from '../common/BasicInput';
import BasicButton from '../common/BasicButton';
import ConfirmModal from '../common/ConfirmModal';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/app/_api/auth';
import { useRouter } from 'next/navigation';
import { openModal } from '@/app/_helper/openModal';
import { SIGN_UP_ERROR_MESSAGE } from '@/app/_constant/modalErrorMessage';

const SignUpForm = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<SignUpData>({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      passwordCheck: '',
    },
  });

  const handleSignUp = (data: SignUpData) => {
    if (
      !data.email ||
      !data.nickname ||
      !data.password ||
      !data.passwordCheck
    ) {
      openModal('missing_info_error_modal');
      return;
    }
    if (data.password.length < 6) {
      openModal('password-lenght-error');
      return;
    }
    if (data.password !== data.passwordCheck) {
      openModal('missmatch-password');
      return;
    }

    const signUpData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };
    mutate(signUpData);
  };

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data?.error !== null) {
        openModal('sign-up-error-modal');
        return;
      }

      openModal('sign-up-success-modal');
    },
  });

  return (
    <div className="z-10 flex flex-col items-center w-full">
      <p className="font-semibold">Threads 회원가입</p>
      <form
        onSubmit={handleSubmit(handleSignUp)}
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
        <BasicInput
          name="passwordCheck"
          control={control}
          type="password"
          placeholder="비밀번호 확인"
        />
        <BasicInput
          name="nickname"
          control={control}
          type="text"
          placeholder="닉네임"
        />
        <BasicButton type="submit">가입</BasicButton>
      </form>
      {SIGN_UP_ERROR_MESSAGE.map((msg) => (
        <ConfirmModal
          key={msg.modalId}
          modalId={msg.modalId}
          title="회원가입 오류"
          content={msg.content}
          confirmText="확인"
        />
      ))}
      <ConfirmModal
        modalId="sign-up-success-modal"
        title="회원가입 성공"
        content="인증 메일이 발송되었습니다. 가입한 이메일로 인증을 완료해 주세요."
        confirmText="확인"
        onConfirm={() => router.push('/')}
      />
    </div>
  );
};

export default SignUpForm;
