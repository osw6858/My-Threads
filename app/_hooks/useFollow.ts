import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../_store/auth';
import { UserType } from '../_types/user';
import {
  ADD_FOLLOW,
  GET_ALL_POSTS,
  GET_FOLLOWERS,
  GET_FOLLWING,
  GET_USER_LIST,
  REMOVE_FOLLOW,
  SEARCH_USER,
} from '../_constant/queryKeys';
import { addfollowUser, removeFollowingUser } from '../_api/follows';
import { useState } from 'react';

export const useFollow = (user: UserType) => {
  const [isFollow, setIsFollow] = useState<boolean>();
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
      client.invalidateQueries({ queryKey: [SEARCH_USER] });
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
      client.invalidateQueries({ queryKey: [GET_FOLLWING] });
    },
  });

  const removeFollow = useMutation({
    mutationKey: [REMOVE_FOLLOW],
    mutationFn: removeFollowingUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_FOLLOWERS] });
      client.invalidateQueries({ queryKey: [GET_USER_LIST] });
      client.invalidateQueries({ queryKey: [SEARCH_USER] });
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
      client.invalidateQueries({ queryKey: [GET_FOLLWING] });
    },
  });

  const handleAddFollow = () => {
    setIsFollow(false);
    addFollow.mutate(followData);
  };

  const handleRemoveFollow = () => {
    setIsFollow(true);
    removeFollow.mutate(followData);
  };

  return {
    addFollowMutation: addFollow,
    removeFollowMutation: removeFollow,
    handleAddFollow,
    handleRemoveFollow,
    isFollow,
    setIsFollow,
  };
};
