import SignUpForm from '@/app/_components/auth/SignUpForm';
import Footer from '@/app/_components/common/Footer';
import TextNav from '@/app/_components/common/TextNav';
import TopLogo from '@/app/_components/icons/TopLogo';
import { END_POINT } from '@/app/_constant/endPoint';

const SignUp = () => {
  return (
    <div className="h-screen relative flex justify-center overflow-hidden">
      <div className="flex justify-center items-center flex-col w-[418px] p-6">
        <TopLogo style="mb-10" />
        <SignUpForm />
        <TextNav
          title="이미 회원 이신가요?"
          style="mt-5"
          href={END_POINT.ROOT}
        />
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
