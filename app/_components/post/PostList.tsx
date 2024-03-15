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

const PostList = () => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loader = useRef(null);

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

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !isFetchingMore && hasNextPage) {
        setIsFetchingMore(true);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFetchingMore, hasNextPage]);

  useEffect(() => {
    if (!isFetchingMore) return;

    fetchNextPage().then(() => setIsFetchingMore(false));
  }, [isFetchingMore, fetchNextPage]);

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <div className={`w-full ${data ? 'h-full' : 'h-screen'} flex flex-col`}>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data?.map((post: PostType) => (
            <Post key={post.post_id} post={post} />
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
