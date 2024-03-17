import { UserType } from '@/app/_types/user';
import Image from 'next/image';
import BasicButton from '../common/BasicButton';
import { useAuthStore } from '@/app/_store/auth';
import ProfilEditModal from './ProfilEditModal';
import { openModal } from '@/app/_helper/openModal';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ADD_FOLLOW,
  GET_FOLLOWERS,
  REMOVE_FOLLOW,
} from '@/app/_constant/queryKeys';
import {
  addfollowUser,
  getFollowerUser,
  getFollowingUsers,
  removeFollowingUser,
} from '@/app/_api/follows';
import { useEffect, useState } from 'react';

const UserProfile = ({ user }: { user: UserType }) => {
  const { userInfo } = useAuthStore();
  const client = useQueryClient();

  const [follower, following] = useQueries({
    queries: [
      {
        queryKey: [GET_FOLLOWERS],
        queryFn: () => getFollowingUsers(userInfo.uid),
      },
      {
        queryKey: [GET_FOLLOWERS],
        queryFn: () => getFollowerUser(user.uuid),
      },
    ],
  });

  const followData = {
    followerId: userInfo.uid,
    followingId: user.uuid,
  };

  const addFollow = useMutation({
    mutationKey: [ADD_FOLLOW],
    mutationFn: addfollowUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_FOLLOWERS] });
    },
  });

  const removeFollow = useMutation({
    mutationKey: [REMOVE_FOLLOW],
    mutationFn: removeFollowingUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_FOLLOWERS] });
    },
  });

  const editProfile = () => {
    openModal('profile-eidt');
  };

  const handAddleFollow = () => {
    addFollow.mutate(followData);
  };

  const handleRemoveFollow = () => {
    removeFollow.mutate(followData);
  };

  const isFollow = follower.data?.some(
    (item) => item.following_id === user.uuid,
  );

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
                style="p-3 w-full  border border-solid border-lightFontColor dark:border-darkBorder text-black dark:text-white bg-transparent dark:bg-transparent"
                type="button"
                onClick={handleRemoveFollow}
              >
                언팔로우
              </BasicButton>
            ) : (
              <BasicButton
                style="p-3 w-full"
                type="button"
                onClick={handAddleFollow}
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
