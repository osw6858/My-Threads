import { UserType } from '@/app/_types/user';
import Image from 'next/image';
import BasicButton from '../common/BasicButton';
import { useAuthStore } from '@/app/_store/auth';
import ProfileEditModal from './ProfileEditModal';
import { openModal } from '@/app/_helper/openModal';
import { useQueries } from '@tanstack/react-query';
import { GET_FOLLOWERS, GET_FOLLWING } from '@/app/_constant/queryKeys';
import { getFollowerUser, getFollowingUsers } from '@/app/_api/follows';
import { useFollow } from '@/app/_hooks/useFollow';
import { useEffect } from 'react';

const UserProfile = ({ user }: { user: UserType }) => {
  const { userInfo } = useAuthStore();

  const [follower, following] = useQueries({
    queries: [
      {
        queryKey: [GET_FOLLWING, user.uuid],
        queryFn: () => getFollowingUsers(user.uuid),
      },
      {
        queryKey: [GET_FOLLOWERS, user.uuid],
        queryFn: () => getFollowerUser(user.uuid),
      },
    ],
  });

  const editProfile = () => {
    openModal('profile-eidt');
  };

  const { handleAddFollow, handleRemoveFollow, isFollow, setIsFollow } =
    useFollow(user);

  useEffect(() => {
    setIsFollow(follower.data?.some((item) => item.following_id === user.uuid));
  }, [follower.data, setIsFollow, user.uuid]);

  return (
    <div className="h-full pt-4">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">{user.user_name}
          <div className="my-3 text-base font-medium">{user.user_intro}</div>
        </div>
        <div className="avatar flex items-center">
          <div className="w-20 rounded-full">
            <picture>
              <Image
                className="rounded-full"
                src={user.avatar_url}
                width={84}
                height={84}
                alt=""
              />
            </picture>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="mb-5 mr-3 text-lightFontColor dark:text-darkFontColor">
          팔로워 {following.data?.length}명
        </div>
        <div className="mb-5 text-lightFontColor dark:text-darkFontColor">
          팔로잉 {follower.data?.length}명
        </div>
      </div>
      <div>
        {userInfo.uid === user.uuid ? (
          <div className="flex">
            <BasicButton style="p-3 w-full" onClick={editProfile}>
              프로필 수정
            </BasicButton>
          </div>
        ) : (
          <div>
            {isFollow ? (
              <BasicButton
                style="p-3 w-full opacity-70"
                type="button"
                onClick={handleRemoveFollow}
              >
                팔로잉
              </BasicButton>
            ) : (
              <BasicButton
                style="p-3 w-full"
                type="button"
                onClick={handleAddFollow}
              >
                팔로우
              </BasicButton>
            )}
          </div>
        )}
      </div>
      <ProfileEditModal modalId="profile-eidt" user={user} />
    </div>
  );
};

export default UserProfile;
