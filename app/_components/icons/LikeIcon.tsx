import { addLike, removeLike } from '@/app/_api/likes';
import {
  ADD_LIKE,
  GET_ALL_POSTS,
  REMOVE_LIKE,
} from '@/app/_constant/queryKeys';
import { useAuthStore } from '@/app/_store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const LikeIcon = ({
  isLiked,
  postId,
  setLikeCount,
}: {
  isLiked: boolean;
  postId: number;
  setLikeCount: Dispatch<SetStateAction<number>>;
}) => {
  const { userInfo } = useAuthStore();
  const [like, setLike] = useState<boolean>();
  const client = useQueryClient();

  useEffect(() => {
    setLike(isLiked);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = () => {
    if (!like) {
      addLikeMutation.mutate({ userId: userInfo.uid, postId: postId });
      setLikeCount((prev) => prev + 1);
    } else {
      removeLikeMutation.mutate({ userId: userInfo.uid, postId: postId });
      setLikeCount((prev) => prev - 1);
    }
    client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
    setLike(!like);
  };

  const addLikeMutation = useMutation({
    mutationKey: [ADD_LIKE],
    mutationFn: addLike,
  });

  const removeLikeMutation = useMutation({
    mutationKey: [REMOVE_LIKE],
    mutationFn: removeLike,
  });

  return (
    <svg
      aria-label="좋아요"
      role="img"
      viewBox="0 0 24 22"
      width={23}
      height={23}
      onClick={handleLike}
      className={`${
        like
          ? 'fill-red-600 stroke-red-600 dark:fill-red-600 dark:stroke-red-600'
          : 'fill-transparent stroke-black dark:stroke-white'
      } mr-3 stroke-2 cursor-pointer`}
    >
      <title>좋아요</title>
      <path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"></path>
    </svg>
  );
};

export default LikeIcon;
