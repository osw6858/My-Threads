'use client';

import BasicButton from './BasicButton';
import BasicInput from './BasicInput';

interface FormProps {
  title: string;
}

const AuthForm = ({ title }: FormProps) => {
  return (
    <div className="z-10 flex flex-col items-center w-full">
      <p className="font-semibold">{title}</p>
      <form className="flex flex-col mt-3 w-full">
        <BasicInput type="text" placeholder="이메일 주소" />
        <BasicInput type="text" placeholder="비밀번호" />
        <BasicButton>로그인</BasicButton>
      </form>
    </div>
  );
};

export default AuthForm;
