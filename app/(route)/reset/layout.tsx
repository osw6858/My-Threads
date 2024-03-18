import Footer from '@/app/_components/common/Footer';
import TopLogo from '@/app/_components/icons/TopLogo';
import { ReactNode } from 'react';

const ResetLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen relative flex justify-center overflow-hidden">
      <div className="flex justify-center items-center flex-col w-[418px] p-6">
        <TopLogo style="mb-10" height="60px" />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default ResetLayout;
