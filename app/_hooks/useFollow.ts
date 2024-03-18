import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../_store/auth';
import { UserType } from '../_types/user';
import {
  ADD_FOLLOW,
  GET_FOLLOWERS,
  GET_USER_LIST,
  REMOVE_FOLLOW,
} from '../_constant/queryKeys';
import { addfollowUser, removeFollowingUser } from '../_api/follows';

export const useFollow = (user: UserType) => {
  const { userInfo } = useAuthStore();
  const client = useQueryClient();

  const followData = {
    followerId: userInfo.uid,
    followingId: user.uuid,
  };

  const addFollow = useMutation({
    mutationKey: [ADD_FOLLOW],
    mutationFn: addfollowUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_FOLLOWERS] });
      client.invalidateQueries({ queryKey: [GET_USER_LIST] });
    },
  });

  const removeFollow = useMutation({
    mutationKey: [REMOVE_FOLLOW],
    mutationFn: removeFollowingUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_FOLLOWERS] });
      client.invalidateQueries({ queryKey: [GET_USER_LIST] });
    },
  });

  const handleAddFollow = () => {
    addFollow.mutate(followData);
  };

  const handleRemoveFollow = () => {
    removeFollow.mutate(followData);
  };

  return {
    addFollowMutation: addFollow,
    removeFollowMutation: removeFollow,
    handleAddFollow,
    handleRemoveFollow,
  };
};
