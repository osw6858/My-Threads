'use client';

import { getUserPost } from '@/app/_api/post';
import { getUserInfoWithUserName } from '@/app/_api/user';
import { GET_USER_INFO, GET_USER_POST } from '@/app/_constant/queryKeys';
import { extractUserName } from '@/app/_helper/extractUserName';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';
import { PostType } from '@/app/_types/post';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import Post from '../post/Post';
import { useEffect, useState } from 'react';
import Skeleton from '../common/Skeleton';
import UserProfile from './UserProfile';

const UserInfo = () => {
  const [userName, setUserName] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const user = extractUserName(pathname) ?? 'No_User';

    const isKoreanOrEnglish = (user: string) => {
      const decodedName = decodeURIComponent(user);

      const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      const englishRegex = /[a-zA-Z]/;

      const isKorean = koreanRegex.test(decodedName);
      const isEnglish = englishRegex.test(decodedName);

      if (isKorean && !isEnglish) {
        return decodedName;
      } else if (isEnglish && !isKorean) {
        return user;
      } else {
        return '';
      }
    };

    const decodeUserName = isKoreanOrEnglish(user);

    setUserName(decodeUserName);
  }, [pathname]);

  const user = useQuery({
    queryKey: [GET_USER_INFO, userName],
    queryFn: () => getUserInfoWithUserName(userName),
    enabled: !!userName,
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [GET_USER_POST, userName],
    queryFn: async ({ pageParam }) => {
      return await getUserPost(user.data?.uuid, pageParam, 5);
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const maxPage = Math.ceil((lastPage.count ?? 0) / 5);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!user.data?.uuid,
  });

  const { loader } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  if (!data) {
    return <Skeleton count={5} />;
  }

  return (
    <div className={`min-h-screen`}>
      <UserProfile user={user.data} />
      <div className="min-h-full">
        <div className="flex justify-center mt-10 border-b border-solid border-darkBorder p-3 mb-4">
          <p className="font-bold">스레드</p>
        </div>
        {data?.pages.map((postList, i) => (
          <div key={i}>
            {postList.data?.map((post: PostType) => (
              <Post key={post.post_id} post={post} isOpenComment={false} />
            ))}
          </div>
        ))}
      </div>
      <div
        className="-translate-y-72"
        ref={loader}
        style={{ visibility: 'hidden' }}
      ></div>
      <div className='h-10'></div>
    </div>
  );
};

export default UserInfo;
