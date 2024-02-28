'use client';

import { useForm } from 'react-hook-form';
import BasicButton from './BasicButton';
import BasicInput from './BasicInput';
import { InputValue } from '../_types/inputType';

interface FormProps {
  title: string;
}

const AuthForm = ({ title }: FormProps) => {
  const { handleSubmit, control } = useForm<InputValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="z-10 flex flex-col items-center w-full">
      <p className="font-semibold">{title}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        <BasicButton>로그인</BasicButton>
      </form>
    </div>
  );
};

export default AuthForm;
