import Skeleton from '@/app/_components/common/Skeleton';
import UserInfo from '@/app/_components/user/UserInfo';
import { Suspense } from 'react';

const UserPage = () => {
  return (
    <div className="h-screen">
      <Suspense fallback={<Skeleton count={3} />}>
        <UserInfo />
      </Suspense>
    </div>
  );
};

export default UserPage;
