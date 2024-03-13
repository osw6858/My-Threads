import TopPostBar from '@/app/_components/main/TopPostBar';
import Posts from '@/app/_components/post/Posts';
import { Suspense } from 'react';

const MainPage = () => {
  return (
    <div className="">
      <TopPostBar />
      <Suspense fallback={<div>로딩중</div>}>
        <Posts />
      </Suspense>
    </div>
  );
};

export default MainPage;
