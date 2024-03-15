import Skeleton from '@/app/_components/common/Skeleton';
import TopPostBar from '@/app/_components/main/TopPostBar';
import PostList from '@/app/_components/post/PostList';
import { Suspense } from 'react';

const MainPage = () => {
  return (
    <div className="h-full">
      <TopPostBar />
      <Suspense fallback={<Skeleton count={3} />}>
        <PostList />
      </Suspense>
    </div>
  );
};

export default MainPage;
