'use client';

import { SignUpData } from '@/app/_types/inputType';
import { useForm } from 'react-hook-form';
import BasicInput from '../common/BasicInput';
import BasicButton from '../common/BasicButton';
import ConfirmModal from '../common/ConfirmModal';

const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUpData>({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      passwordCheck: '',
    },
  });

  const handleSignUp = (data: SignUpData) => {
    console.log(data);
  };

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
      <ConfirmModal
        modalId="missing_info_error_modal"
        title="회원가입 오류"
        content="모든 항목을 입력해 주세요."
        confirmText="확인"
      />
    </div>
  );
};

export default SignUpForm;
