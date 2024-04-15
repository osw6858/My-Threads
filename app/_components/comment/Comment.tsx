import { CommentType } from '@/app/_types/post';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import { useAuthStore } from '@/app/_store/auth';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DELETE_COMMENT,
  GET_ALL_POSTS,
  GET_COMMENT,
} from '@/app/_constant/queryKeys';
import { removeComment } from '@/app/_api/post';
import { END_POINT } from '@/app/_constant/endPoint';
import LikeIcon from '../icons/LikeIcon';
import CommentIcon from '../icons/CommentIcon';
import { useActive } from '@/app/_hooks/useActive';

const Comment = ({ comment }: { comment: CommentType }) => {
  const { userInfo } = useAuthStore();
  const [isCommentUser, setIsCommentUser] = useState(false);

  const client = useQueryClient();
  const { likeCount, setLikeCount, commentCount, setCommentCount } = useActive({
    likeCounts: 10,
    commentCounts: 10,
  });

  useEffect(() => {
    if (userInfo.uid === comment.user_id) {
      setIsCommentUser(true);
    }
  }, [comment.user_id, userInfo.uid]);

  const handleComment = () => {
    const commentData = {
      commentId: comment.id,
      userId: userInfo.uid,
      postId: comment.post_id,
    };
    mutate(commentData);
  };

  const { mutate } = useMutation({
    mutationKey: [DELETE_COMMENT],
    mutationFn: removeComment,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_COMMENT, comment.post_id] });
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
    },
  });

  return (
    <div key={comment.id} className="my-10">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="avatar flex items-center">
              <div className="w-9 rounded-full">
                <Link href={`${END_POINT.USER}/${comment.users.user_name}`}>
                  <picture>
                    <Image
                      className="rounded-full"
                      width={36}
                      height={36}
                      src={comment.users.avatar_url}
                      alt={''}
                    />
                  </picture>
                </Link>
              </div>
            </div>
            <Link href={`${END_POINT.USER}/${comment.users.user_name}`}>
              <p className="ml-3">{comment.users.user_name}</p>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <span tabIndex={0} role="button">
              ···
            </span>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 text-red-600 font-bold"
            >
              <li>
                <span>신고하기</span>
              </li>
              {isCommentUser && (
                <li onClick={handleComment}>
                  <span>삭제</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-2 pl-11">
          {parse(comment.content)}
          <>
            <div className="flex  mt-5 ">
              <LikeIcon
                setLikeCount={setLikeCount}
                isLiked={false}
                id={comment.post_id}
              />
              <CommentIcon id={comment?.post_id} />
            </div>
            <div className=" mt-3 text-sm text-lightFontColor dark:text-darkFontColor">
              {likeCount > 0 && <span>좋아요 {likeCount}개</span>}
              <Link
                className="ml-3"
                href={`${END_POINT.COMMENT}/${comment?.post_id}`}
              >
                {commentCount > 0 && <span>댓글{commentCount}개</span>}
              </Link>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Comment;
