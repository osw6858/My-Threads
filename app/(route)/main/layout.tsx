import TopHeader from '@/app/_components/main/TopHeader';
import PostModal from '@/app/_components/post/PostModal';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <TopHeader />
      <div className="container mx-auto max-w-[620px] px-6 pt-16 ">
        {children}
      </div>
      <PostModal modalId={'add-post'} />
    </div>
  );
};

export default MainLayout;
