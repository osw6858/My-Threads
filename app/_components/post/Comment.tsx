import { CommentType } from '@/app/_types/post';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import { useAuthStore } from '@/app/_store/auth';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE_COMMENT, GET_COMMENT } from '@/app/_constant/queryKeys';
import { removeComment } from '@/app/_api/post';

const Comment = ({ comment }: { comment: CommentType }) => {
  const { userInfo } = useAuthStore();
  const [isCommentUser, setIsCommentUser] = useState(false);

  const client = useQueryClient();

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
    },
  });

  return (
    <div key={comment.id} className="my-10">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              className="rounded-full"
              width={36}
              height={36}
              src={comment.users.avatar_url}
              alt={''}
            />
            <p className="ml-3">{comment.users.user_name}</p>
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
                <Link href={''}>신고하기</Link>
              </li>

              {isCommentUser && (
                <li onClick={handleComment}>
                  <p>삭제</p>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-2 pl-11">{parse(comment.content)}</div>
      </div>
    </div>
  );
};

export default Comment;
