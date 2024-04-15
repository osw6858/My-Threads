import Skeleton from '@/app/_components/common/Skeleton';
import { Suspense } from 'react';
import CommentList from '@/app/_components/comment/CommentList';

const CommentPage = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Skeleton count={1} />}>
        <CommentList />
      </Suspense>
    </div>
  );
};

export default CommentPage;
