import { UserType } from '@/app/_types/user';
import Image from 'next/image';
import BasicButton from '../common/BasicButton';
import { useAuthStore } from '@/app/_store/auth';
import ProfilEditModal from './ProfilEditModal';
import { openModal } from '@/app/_helper/openModal';
import { useQueries } from '@tanstack/react-query';
import { GET_FOLLOWERS, GET_FOLLWING } from '@/app/_constant/queryKeys';
import { getFollowerUser, getFollowingUsers } from '@/app/_api/follows';
import { useFollow } from '@/app/_hooks/useFollow';

const UserProfile = ({ user }: { user: UserType }) => {
  const { userInfo } = useAuthStore();

  const [follower, following] = useQueries({
    queries: [
      {
        queryKey: [GET_FOLLWING, 'follower'],
        queryFn: () => getFollowingUsers(userInfo.uid),
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

  const isFollow = follower.data?.some(
    (item) => item.following_id === user.uuid,
  );

  const { handleAddFollow, handleRemoveFollow } = useFollow(user);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">{user.user_name}</div>
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
      <div className="mb-10">{user.user_intro}</div>
      <div className="mb-5 text-lightFontColor dark:text-darkFontColor">
        팔로워 {following.data?.length}명
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
      <ProfilEditModal modalId="profile-eidt" user={user} />
    </div>
  );
};

export default UserProfile;
