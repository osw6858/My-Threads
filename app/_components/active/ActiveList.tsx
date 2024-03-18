'use client';

import { getLikeActivity } from '@/app/_api/activity';
import { GET_ACTIVE_USER } from '@/app/_constant/queryKeys';
import { useAuthStore } from '@/app/_store/auth';
import { useQuery } from '@tanstack/react-query';
import Active from './Active';
import { ActiveType } from '@/app/_types/active';

const ActiveList = () => {
  const { userInfo } = useAuthStore();

  const { data } = useQuery({
    queryKey: [GET_ACTIVE_USER],
    queryFn: () => getLikeActivity(userInfo.uid),
  });

  return (
    <div className="flex flex-col mt-3">
      {data?.data?.map((active: ActiveType) => (
        <div key={active.id}>
          {active.active_user !== userInfo.uid && <Active active={active} />}
        </div>
      ))}
    </div>
  );
};

export default ActiveList;
