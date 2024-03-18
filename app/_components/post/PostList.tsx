'use client';

import { getFollowedUsersPosts } from '@/app/_api/post';
import { GET_ALL_POSTS } from '@/app/_constant/queryKeys';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { PostType } from '@/app/_types/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import Post from './Post';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';
import { useAuthStore } from '@/app/_store/auth';
import Skeleton from '../common/Skeleton';

const PostList = () => {
  const { userInfo } = useAuthStore();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [GET_ALL_POSTS, userInfo.uid],
    queryFn: async ({ pageParam }) => {
      const response = await getFollowedUsersPosts(userInfo.uid, pageParam, 5);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const maxPage = Math.ceil((lastPage.count ?? 0) / 5);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!userInfo.uid,
  });

  const { loader } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  if (!data) {
    return <Skeleton count={3} />;
  }

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <div className={`w-full ${data ? 'h-full' : 'h-screen'} flex flex-col`}>
      {data?.pages.map((page, i) => (
        <div className="min-h-screen" key={i}>
          {page.data?.map((post: PostType) => (
            <Post key={post.post_id} post={post} isOpenComment={false} />
          ))}
        </div>
      ))}
      <div
        className="-translate-y-72"
        ref={loader}
        style={{ visibility: 'hidden' }}
      ></div>
    </div>
  );
};

export default PostList;
