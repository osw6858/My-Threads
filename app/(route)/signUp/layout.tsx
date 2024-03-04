import Footer from '@/app/_components/common/Footer';
import TopLogo from '@/app/_components/icons/TopLogo';
import { ReactNode } from 'react';

const SignUpLayOut = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <TopLogo style="my-10" />
      {children}
      <Footer />
    </div>
  );
};

export default SignUpLayOut;
