import { UserList } from '@/app/_types/user';
import BasicButton from '../common/BasicButton';
import Image from 'next/image';
import { useFollow } from '@/app/_hooks/useFollow';
import { useAuthStore } from '@/app/_store/auth';

const User = ({
  user,
  isSearched,
}: {
  user: UserList;
  isSearched: boolean;
}) => {
  const { handleAddFollow, handleRemoveFollow } = useFollow(user);

  const { userInfo } = useAuthStore();

  const isFollow = user.follows.some(
    (item) => item.follower_id === userInfo.uid,
  );

  return (
    <>
      <div className="flex my-4 w-full min-h-16">
        <div>
          <div className="avatar flex items-center">
            <div className="w-9 rounded-full">
              <picture>
                <Image height={20} width={20} src={user?.avatar_url} alt="" />
              </picture>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full pl-3">
          <div className="grid gap-2">
            <p className="font-semibold">{user.user_name}</p>
            <p className="text-lightFontColor  dark:text-darkFontColor">
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
              <BasicButton
                onClick={handleRemoveFollow}
                style="p-2 px-8 bg-transparent text-gray-900 dark:bg-transparent dark:text-white border border-soild border-nonSelectIcon dark:border-darkBorder "
                type="button"
              >
                팔로잉
              </BasicButton>
            ) : (
              <BasicButton
                onClick={handleAddFollow}
                style="p-2 px-8 bg-transparent text-gray-900 dark:bg-transparent dark:text-white border border-soild border-nonSelectIcon dark:border-darkBorder "
                type="button"
              >
                팔로우
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
