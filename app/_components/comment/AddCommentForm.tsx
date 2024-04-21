import { addComment } from '@/app/_api/comment';
import {
  GET_ALL_POSTS,
  GET_COMMENT,
  GET_SELECTED_POST,
} from '@/app/_constant/queryKeys';
import { extractNumberFromUrl } from '@/app/_helper/extractNumberFromUrl';
import { useAuthStore } from '@/app/_store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

interface CommentProps {
  postId: number | undefined;
  commentId: number | undefined;
  comments: string;
  setComments: Dispatch<SetStateAction<string>>;
}

const AddCommentForm = ({
  postId,
  commentId,
  comments,
  setComments,
}: CommentProps) => {
  const pathname = usePathname();

  const [isEmpty, setIsEmpty] = useState(true);

  const { userInfo } = useAuthStore();
  const client = useQueryClient();

  useEffect(() => {
    if (comments === '' || comments === '<p><br></p>') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [comments]);

  const handleSubmit = () => {
    if (!postId) {
      console.error('코멘트 추가 중 에러 발생: Id값이 없음');
      return;
    }
    const commentData = {
      content: DOMPurify.sanitize(comments),
      userId: userInfo.uid,
      commentId,
      postId,
    };

    mutate(commentData);
  };

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
      client.invalidateQueries({
        queryKey: [GET_COMMENT, extractNumberFromUrl(pathname)],
      });
      client.invalidateQueries({
        queryKey: [GET_SELECTED_POST, extractNumberFromUrl(pathname)],
      });
    },
  });

  return (
    <>
      <form>
        <ReactQuill
          className="text-gray-700 dark:text-gray-400 placeholder:text-nonSelectIcon pl-5"
          theme="bubble"
          value={comments}
          onChange={setComments}
          placeholder="댓글을 달아 주세요..."
        />
      </form>
      <div className="modal-action">
        <form method="dialog">
          <button
            className={`btn  p-4 rounded-2xl ${
              isEmpty
                ? 'pointer-events-none cursor-not-allowed bg-gray-500 text-white dark:bg-gray-600 dark:text-white'
                : 'bg-black dark:bg-white text-white dark:text-black'
            }`}
            onClick={handleSubmit}
          >
            게시
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCommentForm;
