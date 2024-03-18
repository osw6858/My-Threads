import { addComment, getComments } from '@/app/_api/post';
import {
  ADD_COMMENT,
  GET_ALL_POSTS,
  SEARCH_POST,
} from '@/app/_constant/queryKeys';
import { useAuthStore } from '@/app/_store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

const AddCommentForm = ({ postId }: { postId: number }) => {
  const [comment, setComment] = useState<string | Node>('');
  const [isEmpty, setIsEmpty] = useState(true);
  const safeHTML = DOMPurify.sanitize(comment);

  const { userInfo } = useAuthStore();
  const client = useQueryClient();

  useEffect(() => {
    if (comment === '' || comment === '<p><br></p>') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [comment]);

  const handleSubmit = () => {
    console.log(postId);
    const commentData = {
      content: safeHTML,
      userId: userInfo.uid,
      postId,
    };

    mutate(commentData);
  };

  const { mutate } = useMutation({
    mutationKey: [ADD_COMMENT],
    mutationFn: addComment,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
      client.invalidateQueries({ queryKey: [SEARCH_POST] });
    },
  });

  return (
    <>
      <form>
        <ReactQuill
          className="text-gray-700 dark:text-gray-400 placeholder:text-nonSelectIcon"
          theme="bubble"
          onChange={setComment}
          placeholder="댓글을 달아 주세요..."
        />
      </form>
      <div className="modal-action absolute bottom-3 right-3 sm:flex sm:static">
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
