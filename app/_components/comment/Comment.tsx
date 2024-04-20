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
import { END_POINT } from '@/app/_constant/endPoint';
import LikeIcon from '../icons/LikeIcon';
import CommentIcon from '../icons/CommentIcon';
import { useActive } from '@/app/_hooks/useActive';
import { removeComment } from '@/app/_api/comment';
import CommentModal from './CommentModal';
import { extractNumberFromUrl } from '@/app/_helper/extractNumberFromUrl';
import { usePathname } from 'next/navigation';

const Comment = ({ comment }: { comment: CommentType }) => {
  const pathname = usePathname();
  const { userInfo } = useAuthStore();
  const [isCommentUser, setIsCommentUser] = useState(false);

  const client = useQueryClient();
  const { likeCount, setLikeCount, commentCount } = useActive({
    likeCounts: comment?.comment_likes?.length,
    commentCounts: comment?.replies?.length,
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
      client.invalidateQueries({
        queryKey: [GET_COMMENT, extractNumberFromUrl(pathname)],
      });
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
    },
  });

  const isLiked =
    comment?.comment_likes?.find((like) => like.user_id === userInfo.uid) !==
    undefined;

  return (
    <div key={comment.id} className="">
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
        <div className="flex mb-3">
          <div className="flex justify-center w-9 mt-2">
            {comment.replies?.length > 0 && (
              <div className="w-[2px] min-h-4 bg-gray-200  dark:bg-darkBorder" />
            )}
          </div>
          <div className="mt-1 pl-3">
            {parse(comment.content)}
            <>
              <div className="flex  mt-5">
                <LikeIcon
                  isComment
                  setLikeCount={setLikeCount}
                  isLiked={isLiked}
                  id={comment.id}
                />
                <CommentIcon isReply id={comment.id} />
                <CommentModal
                  modalId={`open-reply-modal${comment.id}`}
                  comment={comment}
                />
              </div>
              <div className=" mt-3 text-sm text-lightFontColor dark:text-darkFontColor">
                {likeCount > 0 && <span>좋아요 {likeCount}개</span>}
                <span className="ml-3">
                  {commentCount > 0 && <span>댓글{commentCount}개</span>}
                </span>
              </div>
            </>
          </div>
        </div>
      </div>
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      {comment.parent_id === null && (
        <hr className="border-gray-200 dark:border-gray-800 pb-4" />
      )}
    </div>
  );
};

export default Comment;
