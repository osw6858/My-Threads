import AuthForm from './_components/AuthForm';
import Image from 'next/image';
import TopImage from '../public/login_pic.webp';
import KakaoLogo from '../public/KakaoTalk_logo.png';
import Footer from './_components/Footer';
import TopLogo from './_components/TopLogo';

export default function Home() {
  return (
    <div className="h-screen relative flex justify-center overflow-hidden">
      <picture className="absolute top-0 w-[1780px] select-none pointer-events-none">
        <Image
          className="hidden sm:block"
          priority
          alt=""
          src={TopImage}
          width={1785}
          height={510}
        />
      </picture>
      <div className="flex justify-center items-center flex-col w-[418px] p-6">
        <TopLogo />
        <AuthForm title="Threads 계정으로 로그인" />
        <div className="text-lightFontColor dark:text-darkFontColor mt-3">
          <span className="cursor-pointer">비밀번호를 잊으셨나요?</span>
        </div>
        <div className="inline-flex items-center justify-center w-full dark:text-darkFontColor">
          <hr className="h-px w-full my-8 bg-lightFontColor border-0 dark:bg-darkBorder" />
          <span className="absolute px-3 -translate-x-1/2 text-lightFontColor bg-white left-1/2 dark:text-darkFontColor dark:bg-darkMode">
            또는
          </span>
        </div>
        <div className="cursor-pointer border border-solid p-5 flex justify-between items-center border-lightFontColor dark:border-darkBorder rounded-xl h-[87px] w-full">
          <Image
            priority
            src={KakaoLogo}
            alt="카카오톡"
            width={45}
            height={45}
          />
          <p className="font-semibold">카카오톡으로 계속</p>
          <div className="border-t-2 border-r-2 border-solid border-gray-600 w-3 h-3 mr-2 rotate-45"></div>
        </div>
        <div className="text-lightFontColor dark:text-darkFontColor mt-5">
          <span className="cursor-pointer">아직 회원이 아니신가요?</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
