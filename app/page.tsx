import SignInForm from './_components/auth/SignInForm';
import Image from 'next/image';
import TopImage from '../public/login_pic.webp';
import Footer from './_components/common/Footer';
import TopLogo from './_components/icons/TopLogo';
import TextNav from './_components/common/TextNav';
import KakaoSignIn from './_components/auth/KakaoSignIn';

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
        <SignInForm />
        <TextNav title="비밀번호를 잊으셨나요?" style="mt-3" href={'/'} />
        <div className="inline-flex items-center justify-center w-full dark:text-darkFontColor">
          <hr className="h-px w-full my-8 bg-lightFontColor border-0 dark:bg-darkBorder" />
          <span className="absolute px-3 -translate-x-1/2 text-lightFontColor bg-white left-1/2 dark:text-darkFontColor dark:bg-darkMode">
            또는
          </span>
        </div>
        <KakaoSignIn />
        <TextNav title="아직 회원이 아니신가요?" style="mt-5" href={'/'} />
      </div>
      <Footer />
    </div>
  );
}
