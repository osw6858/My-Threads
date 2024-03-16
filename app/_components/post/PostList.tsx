'use client';

import { getAllPost } from '@/app/_api/post';
import { GET_ALL_POSTS } from '@/app/_constant/queryKeys';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { PostType } from '@/app/_types/post';
import { useEffect, useRef, useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Post from './Post';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';

const PostList = () => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: [GET_ALL_POSTS],
    queryFn: async ({ pageParam }) => {
      const response = await getAllPost(pageParam, 5);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const maxPage = Math.ceil((lastPage.count ?? 0) / 5);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const { loader } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <div className={`w-full ${data ? 'h-full' : 'h-screen'} flex flex-col`}>
      {data?.pages.map((page, i) => (
        <div key={i}>
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
