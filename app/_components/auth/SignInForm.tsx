'use client';

import { useForm } from 'react-hook-form';
import BasicButton from '../common/BasicButton';
import BasicInput from '../common/BasicInput';
import { SignInData } from '../../_types/inputType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SignIn } from '@/app/_api/auth';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<SignInData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = (data: SignInData) => {
    const signInData = {
      email: data.email,
      password: data.password,
    };

    mutate(signInData);
  };

  const openModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.showModal();
  };

  const { mutate } = useMutation({
    mutationFn: SignIn,
    onSuccess: (data) => {
      if (data?.error !== null) {
        openModal();
        return;
      }
      console.log(data);
      router.push('/success');
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">로그인 오류</h3>
          <p className="py-4">이메일과 비밀번호를 다시 확인해 주세요.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">확인</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SignInForm;
