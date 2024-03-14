'use client';

import { getAllPost } from '@/app/_api/post';
import { GET_ALL_POSTS } from '@/app/_constant/queryKeys';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { PostType } from '@/app/_types/post';
import dynamic from 'next/dynamic';
import Skeleton from '../common/Skeleton';

const PostList = () => {
  const { data } = useQuery({
    queryKey: [GET_ALL_POSTS],
    queryFn: getAllPost,
  });

  console.log(data);

  const Post = dynamic(() => import('./Post'), {
    ssr: false,
    loading: () => <Skeleton />,
  });

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <div className={`w-full ${data ? 'h-full' : 'h-screen'} flex flex-col`}>
      {data?.map((post: PostType) => (
        <Post post={post} key={post.post_id} />
      ))}
    </div>
  );
};

export default PostList;
