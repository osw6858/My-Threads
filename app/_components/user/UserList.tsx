'use client';

import { getUserList } from '@/app/_api/user';
import { GET_USER_LIST } from '@/app/_constant/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import Skeleton from '../common/Skeleton';
import User from './User';
import { UserList } from '@/app/_types/user';
import { useAuthStore } from '@/app/_store/auth';

const UserList = () => {
  const { data } = useQuery({
    queryKey: [GET_USER_LIST],
    queryFn: getUserList,
  });

  const { userInfo } = useAuthStore();

  return (
    <div className="flex flex-col mt-3">
      <Suspense fallback={<Skeleton count={5} />}>
        {data?.data?.map((user: UserList) => (
          <div key={user.id}>
            {user.uuid !== userInfo.uid && (
              <User isSearched={false} user={user} />
            )}
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default UserList;
