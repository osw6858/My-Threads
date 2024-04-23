import { UserList } from '@/app/_types/user';
import BasicButton from '../common/BasicButton';
import Image from 'next/image';
import { useFollow } from '@/app/_hooks/useFollow';
import { useAuthStore } from '@/app/_store/auth';
import { END_POINT } from '@/app/_constant/endPoint';
import Link from 'next/link';
import { useEffect } from 'react';

const User = ({
  user,
  isSearched,
}: {
  user: UserList;
  isSearched: boolean;
}) => {
  const { handleAddFollow, handleRemoveFollow, isFollow, setIsFollow } =
    useFollow(user);

  const { userInfo } = useAuthStore();

  useEffect(() => {
    setIsFollow(user.follows.some((item) => item.follower_id === userInfo.uid));
  }, [setIsFollow, user.follows, userInfo.uid]);

  return (
    <>
      <div className="flex my-4 w-full min-h-16">
        <div>
          <div className="avatar flex items-center">
            <div className="w-9 rounded-full">
              <Link href={`${END_POINT.USER}/${user.user_name}`}>
                <picture>
                  <Image height={20} width={20} src={user?.avatar_url} alt="" />
                </picture>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full pl-3">
          <div className="flex flex-col">
            <Link href={`${END_POINT.USER}/${user.user_name}`}>
              <p className="font-semibold mb-2">{user.user_name}</p>
            </Link>
            <p className="text-lightFontColor pr-5 mb-5 dark:text-darkFontColor">
              {user.user_intro}
            </p>
            {!isSearched && (
              <>
                {user.follows.length > 0 && (
                  <p>팔로워 {user.follows.length}명</p>
                )}
              </>
            )}
          </div>

          <div>
            {isFollow ? (
              <button
                onClick={handleRemoveFollow}
                className="rounded-xl border-solid border border-black dark:border-white min-w-[62px] px-3 py-1 text-sm text sm:p-2 sm:px-8 bg-white dark:bg-darkMode"
                type="button"
              >
               <span className='text-black dark:text-white'>팔로잉</span>
              </button>
            ) : (
              <BasicButton
                onClick={handleAddFollow}
                style="min-w-[62px] px-3 py-1 text-sm sm:p-2 sm:px-8 "
                type="button"
              >
                <span>팔로우</span>
              </BasicButton>
            )}
          </div>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-800" />
    </>
  );
};

export default User;
