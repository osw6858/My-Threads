'use client';

import { getAllPost } from '@/app/_api/post';
import { GET_ALL_POSTS } from '@/app/_constant/queryKeys';
import { useAuthStore } from '@/app/_store/auth';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

const Posts = () => {
  const { userInfo } = useAuthStore();

  const { data } = useQuery({
    queryKey: [GET_ALL_POSTS],
    queryFn: () => getAllPost(userInfo.uid),
  });

  console.log(data);

  return <div>ddd</div>;
};

export default Posts;
