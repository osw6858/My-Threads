import TopHeader from '@/app/_components/main/TopHeader';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen">
      <TopHeader />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default MainLayout;
